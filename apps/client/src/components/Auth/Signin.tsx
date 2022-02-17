import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import bg from '@/assets/splash.png';
import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';

import type { User } from '@uxc/types';

import { GET_CURRENT_USER, SIGNIN } from '@/services/api/queries';
import * as S from './styles';
import styled from 'styled-components';

const AlignedLink = styled(Link)`
	align-self: flex-end;
`;

export function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	const [signin] = useMutation(SIGNIN);

	if (loading) {
		return <>Loading...</>;
	}

	if (data) {
		return <Navigate to="/" />;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await signin({
			variables: {
				args: {
					email,
					password
				}
			}
		});

		setEmail('');
		setPassword('');

		navigate(`/`);
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		const executor = name == 'email' ? setEmail : setPassword;

		executor(value);
	};

	return (
		<S.Container style={{ backgroundImage: `url(${bg})` }}>
			<h1>uxc</h1>
			<S.InnerCard>
				<S.Form onSubmit={handleSubmit}>
					<AdaptiveInput
						autoComplete="email"
						id="email-address"
						label="Email address"
						name="email"
						onChange={handleChange}
						placeholder=" "
						required
						type="email"
						value={email}
					/>

					<S.BottomInput
						autoComplete="current-password"
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						placeholder=" "
						required
						type="password"
						value={password}
					/>

					<AlignedLink to="/todo">
						<S.FieldCaptionLink>Forgot your password?</S.FieldCaptionLink>
					</AlignedLink>

					<S.ButtonContainer>
						<S.CTAButton type="submit">Sign in</S.CTAButton>
					</S.ButtonContainer>
				</S.Form>
			</S.InnerCard>

			<S.SwapModeContainer>
				<S.SwapModeLink to="/join">
					<p>Don't have an account?&nbsp;Join now</p>
				</S.SwapModeLink>
			</S.SwapModeContainer>
		</S.Container>
	);
}

Signin.displayName = 'Signin';
