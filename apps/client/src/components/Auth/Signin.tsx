import { ChangeEvent, FormEvent, useEffect } from 'react';

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
	const [error, setError] = useState('');
	const [disabled, setDisabled] = useState(true);

	const navigate = useNavigate();
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	const [signin] = useMutation(SIGNIN);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

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
			setError(ex?.message || 'Something went wrong');
		} finally {
			setEmail('');
			setPassword('');
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setError('');
		const { value, name } = event.target;
		const executor = name == 'email' ? setEmail : setPassword;

		executor(value);
	};

	useEffect(() => {
		if (email && password) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [email, password]);

	if (loading) {
		return <>Loading...</>;
	}

	if (data) {
		return <Navigate to="/" />;
	}

	return (
		<S.Container style={{ backgroundImage: `url(${bg})` }}>
			<h1>uxc</h1>
			<S.InnerCard size="sm">
				<S.Form onSubmit={handleSubmit}>
					<S.AdjustedInput
						autoComplete="email"
						id="email-address"
						label="Email address"
						name="email"
						onChange={handleChange}
						placeholder="youremail@domain.com"
						required
						type="email"
						value={email}
					/>
					<AdaptiveInput
						autoComplete="current-password"
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						placeholder="************"
						required
						type="password"
						value={password}
					/>
					<AlignedLink to="/todo">
						<S.FieldCaptionLink>Forgot your password?</S.FieldCaptionLink>
					</AlignedLink>

					<S.ErrorText>{error}</S.ErrorText>

					<S.CTAButton type="submit" loading={loading} disabled={disabled}>
						Sign in
					</S.CTAButton>
				</S.Form>

				<S.Footer>
					<S.SwapModeLink to="/join">
						<p>Don't have an account?&nbsp;Join now</p>
					</S.SwapModeLink>
				</S.Footer>
			</S.InnerCard>
		</S.Container>
	);
}

Signin.displayName = 'Signin';
