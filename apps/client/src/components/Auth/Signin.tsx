/* eslint-disable react/no-array-index-key */
import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ERROR_MESSAGES, User } from '@uxc/types';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import type { NormalizedError, MaybeGQLError } from '@/services/error';

import { ErrorMessage, MESSAGE_TIMEOUT } from '@/components/Auth/ErrorMessage';
import * as S from '@/components/Auth/styles';
import {
	validateEmail,
	validateSigninPassword
} from '@/components/Auth/validators';
import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';
import { useValidation } from '@/hooks';
import { GET_CURRENT_USER, SIGNIN } from '@/services/api/queries';
import { normalizeError } from '@/services/error';

const AlignedLink = styled(Link)`
	align-self: flex-end;
`;

export function Signin() {
	const firstInteractiveRef = useRef<HTMLInputElement>(null);
	const [errors, setErrors] = useState<NormalizedError[]>([]);

	const navigate = useNavigate();

	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const [signin] = useMutation<{ signin: User }>(SIGNIN);

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
	} = useValidation(validateSigninPassword);

	const formInvalid = !email || !password || !!emailError || !!passwordError;

	function resetState() {
		setEmail('');
		setPassword('');
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		function executor(name: string) {
			switch (name) {
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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (formInvalid) {
			return;
		}

		// @todo only try cold auth once
		try {
			const { data } = await signin({
				variables: {
					args: {
						email,
						password
					}
				}
			});

			if (!data?.signin) {
				setErrors([
					{
						code: 'UNKNOWN_ERROR',
						field: null,
						message: ERROR_MESSAGES.E_GENERIC_FRIENDLY
					}
				]);

				return;
			}

			resetState();
			navigate(`/`);
		} catch (ex) {
			setErrors(normalizeError(ex as MaybeGQLError));
		}
	}

	useEffect(() => {
		firstInteractiveRef.current?.focus();
	}, [firstInteractiveRef]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrors([]);
		}, MESSAGE_TIMEOUT);

		return () => {
			clearTimeout(timer);
		};
	}, [errors, setErrors]);

	if (data) {
		return <Navigate to="/" />;
	}

	return (
		<S.InnerCard size="sm">
			{errors.map(({ message }, idx) => (
				<ErrorMessage key={idx} message={message} />
			))}

			<S.Form onSubmit={handleSubmit}>
				<AdaptiveInput
					aria-autocomplete="list"
					autoComplete="email"
					data-testid="email-input"
					error={emailError}
					id="email-address"
					label="Email address"
					name="email"
					onBlur={setEmailDirty}
					onChange={handleChange}
					ref={firstInteractiveRef}
					required
					type="email"
					value={email}
				/>

				<AdaptiveInput
					aria-autocomplete="list"
					autoComplete="current-password"
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

				<AlignedLink data-testid="forgot-pw-button" to="/todo">
					<S.FieldCaptionLink>Forgot your password?</S.FieldCaptionLink>
				</AlignedLink>

				<S.CTAButton
					aria-describedby="disabledReason"
					aria-disabled={formInvalid}
					data-testid="signin-button"
					loading={loading}
					type="submit"
				>
					Sign in
				</S.CTAButton>
			</S.Form>

			<S.Footer>
				<S.SwapModeLink to="/join">
					<p>Don&apos;t have an account?&nbsp;Join now</p>
				</S.SwapModeLink>
			</S.Footer>
		</S.InnerCard>
	);
}

Signin.displayName = 'Signin';
