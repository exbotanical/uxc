import { ChangeEvent, useEffect, useRef } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { GET_CURRENT_USER, JOIN } from '@/services/api';
import { useValidation } from '@/hooks';

import * as S from './styles';

import type { FormEvent } from 'react';
import type { User } from '@uxc/types';
import {
	validateEmail,
	validatePassword,
	validateUsername
} from './validators';
import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';

export function Join() {
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const firstInteractiveRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [join] = useMutation(JOIN);
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

		const data = await join({
			variables: {
				args: {
					email,
					password,
					username
				}
			}
		});

		console.log({ data });

		resetState();

		navigate(`/`);
	}

	useEffect(() => {
		firstInteractiveRef.current?.focus();
	}, []);

	if (data) {
		return <Navigate to="/thread" />;
	}

	return (
		<S.InnerCard size="lg">
			<S.Form onSubmit={handleSubmit}>
				<AdaptiveInput
					autoComplete="username"
					id="username"
					label="Username"
					name="username"
					onChange={handleChange}
					required
					type="text"
					value={username}
					data-testid="username-input"
					ref={firstInteractiveRef}
					onBlur={setUsernameDirty}
					error={usernameError}
				/>

				<AdaptiveInput
					autoComplete="email"
					id="email-address"
					label="Email address"
					name="email"
					onChange={handleChange}
					required
					type="email"
					value={email}
					data-testid="email-input"
					onBlur={setEmailDirty}
					error={emailError}
				/>

				<AdaptiveInput
					autoComplete="current-password"
					id="password"
					label="Password"
					name="password"
					onChange={handleChange}
					required
					type="password"
					value={password}
					data-testid="password-input"
					onBlur={setPasswordDirty}
					error={passwordError}
				/>

				<S.CTAButton
					loading={loading}
					type="submit"
					data-testid="join-button"
					aria-disabled={formInvalid}
					aria-describedby="disabledReason"
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
