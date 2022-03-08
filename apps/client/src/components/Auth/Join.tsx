import type { FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';


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

export function Join() {
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const firstInteractiveRef = useRef<HTMLInputElement>(null);

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

		try {
			const data = await join({
				variables: {
					args: {
						email,
						password,
						username
					}
				}
			});
			resetState();
			navigate(`/`);
		} catch (ex) {
			if (ex instanceof Error) {
				console.log({ M: ex.message });
			}
		}
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

				<AdaptiveInput
					autoComplete="email"
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
