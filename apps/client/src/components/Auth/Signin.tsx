import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import * as S from './styles';

import type { User } from '@uxc/types';

import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';
import { GET_CURRENT_USER, SIGNIN } from '@/services/api/queries';
import { useValidation } from '@/hooks';
import { validateEmail, validatePassword } from './validators';

const AlignedLink = styled(Link)`
	align-self: flex-end;
`;

export function Signin() {
	const navigate = useNavigate();
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	const [signin] = useMutation(SIGNIN);

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

	const formInvalid = !!emailError || !!passwordError;

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// @todo only try cold auth once
		try {
			await signin({
				variables: {
					args: {
						email,
						password
					}
				}
			});

			navigate(`/`);
		} catch (ex: any) {
			// setError(ex?.message || 'Something went wrong');
		} finally {
			setEmail('');
			setPassword('');
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		const executor = name == 'email' ? setEmail : setPassword;

		executor(value);
	};

	if (data) {
		return <Navigate to="/" />;
	}

	return (
		<S.InnerCard size="sm">
			<S.Form onSubmit={handleSubmit}>
				<AdaptiveInput
					autoComplete="email"
					id="email-address"
					label="Email address"
					name="email"
					onChange={handleChange}
					required
					type="email"
					value={email}
					onBlur={setEmailDirty}
					data-testid="email-input"
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
					onBlur={setPasswordDirty}
					data-testid="password-input"
					error={passwordError}
				/>
				<AlignedLink to="/todo">
					<S.FieldCaptionLink>Forgot your password?</S.FieldCaptionLink>
				</AlignedLink>

				<S.CTAButton
					disabled={formInvalid}
					loading={loading}
					type="submit"
					data-testid="signin-button"
				>
					Sign in
				</S.CTAButton>
			</S.Form>

			<S.Footer>
				<S.SwapModeLink to="/join">
					<p>Don't have an account?&nbsp;Join now</p>
				</S.SwapModeLink>
			</S.Footer>
		</S.InnerCard>
	);
}

Signin.displayName = 'Signin';
