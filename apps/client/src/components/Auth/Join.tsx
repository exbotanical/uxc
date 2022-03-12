/* eslint-disable react/no-array-index-key */
import type { FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { ErrorMessage, MESSAGE_TIMEOUT } from './ErrorMessage';
import * as S from './styles';
import {
	validateEmail,
	validatePassword,
	validateUsername
} from './validators';

import type { User } from '@uxc/types';

import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';
import { useValidation } from '@/hooks';
import { GET_CURRENT_USER, JOIN } from '@/services/api';
import { NormalizedError, normalizeError } from '@/services/error';

/**
 * @todo Attempt pre-auth only once
 */
export function Join() {
	const [errors, setErrors] = useState<NormalizedError[]>([]);
	const firstInteractiveRef = useRef<HTMLInputElement>(null);

	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	// @todo update GET_CURRENT_USER cache
	const [join] = useMutation<{
		join: User;
	}>(JOIN);
	const navigate = useNavigate();

	const {
		setDirty: setUsernameDirty,
		input: username,
		setInput: setUsername,
		error: usernameError
	} = useValidation(validateUsername);

	const {
		setDirty: setEmailDirty,
		input: email,
		setInput: setEmail,
		error: emailError
	} = useValidation(validateEmail);

	const {
		setDirty: setPasswordDirty,
		input: password,
		setInput: setPassword,
		error: passwordError
	} = useValidation(validatePassword);

	const formInvalid =
		!username ||
		!email ||
		!password ||
		!!usernameError ||
		!!emailError ||
		!!passwordError;

	function resetState() {
		setEmail('');
		setPassword('');
		setUsername('');
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		function executor(name: string) {
			switch (name) {
				case 'username':
					setUsername(value);
					break;
				case 'password':
					setPassword(value);
					break;
				case 'email':
					setEmail(value);
					break;
				default:
					break;
			}
		}

		executor(name);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (formInvalid) {
			return;
		}

		try {
			const { data } = await join({
				variables: {
					args: {
						email,
						password,
						username
					}
				}
			});

			if (!data?.join) {
				setErrors([
					{
						code: 'UNKNOWN_ERROR',
						field: null,
						message:
							'Something went wrong. Please try again or contact support.'
					}
				]);

				return;
			}

			resetState();
			navigate(`/`);
		} catch (ex) {
			if (ex instanceof Error) {
				setErrors(normalizeError(ex));
			}
		}
	}

	useEffect(() => {
		firstInteractiveRef.current?.focus();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrors([]);
		}, MESSAGE_TIMEOUT);

		return () => {
			clearTimeout(timer);
		};
	}, [errors, setErrors]);

	if (data) {
		return <Navigate to="/thread" />;
	}

	return (
		<S.InnerCard size="lg">
			{errors.map(({ message }, idx) => (
				<ErrorMessage key={idx} message={message} />
			))}

			<S.Form autoComplete="off" onSubmit={handleSubmit}>
				<AdaptiveInput
					data-testid="username-input"
					error={usernameError}
					id="username"
					label="Username"
					name="username"
					onBlur={setUsernameDirty}
					onChange={handleChange}
					ref={firstInteractiveRef}
					required
					type="text"
					value={username}
				/>

				{/* Chrome browsers will not allow autocomplete to be disabled, so we add ARIA autocomplete anyway */}
				<AdaptiveInput
					aria-autocomplete="list"
					data-testid="email-input"
					error={emailError}
					id="email-address"
					label="Email address"
					name="email"
					onBlur={setEmailDirty}
					onChange={handleChange}
					required
					type="email"
					value={email}
				/>

				<AdaptiveInput
					data-testid="password-input"
					error={passwordError}
					id="password"
					label="Password"
					name="password"
					onBlur={setPasswordDirty}
					onChange={handleChange}
					required
					type="password"
					value={password}
				/>

				<S.CTAButton
					aria-describedby="disabledReason"
					aria-disabled={formInvalid}
					data-testid="join-button"
					loading={loading}
					type="submit"
				>
					Join
				</S.CTAButton>
			</S.Form>

			<S.Footer>
				<S.SwapModeLink to="/signin">
					<p>Already have an account?&nbsp;Sign in</p>
				</S.SwapModeLink>
			</S.Footer>
		</S.InnerCard>
	);
}

Join.displayName = 'Join';
