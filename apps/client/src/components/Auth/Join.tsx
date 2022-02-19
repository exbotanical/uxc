import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import bg from '@/assets/splash.png';
import { AdaptiveInput } from '@/components/Fields/AdaptiveInput';
import * as S from './styles';

import type { User } from '@uxc/types';

import { GET_CURRENT_USER, JOIN } from '@/services/api/queries';

export function Join() {
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const [join] = useMutation(JOIN);
	const navigate = useNavigate();

	if (data) {
		console.log({ data });
		return <Navigate to="/thread" />;
	}

	function resetState() {
		setEmail('');
		setPassword('');
		setUsername('');
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await join({
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
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
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
	};

	return (
		<S.Container style={{ backgroundImage: `url(${bg})` }}>
			<h1>uxc</h1>

			<S.InnerCard size="lg">
				<S.Form onSubmit={handleSubmit}>
					<S.AdjustedInput
						autoComplete="username"
						id="username"
						label="Username"
						name="username"
						onChange={handleChange}
						placeholder="yourusername"
						required
						type="text"
						value={username}
					/>

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

					<S.AdjustedInput
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

					<S.CTAButton type="submit" loading={loading}>
						Join
					</S.CTAButton>
				</S.Form>

				<S.Footer>
					<S.SwapModeLink to="/signin">
						<p>Already have an account?&nbsp;Sign in</p>
					</S.SwapModeLink>
				</S.Footer>
			</S.InnerCard>
		</S.Container>
	);
}

Join.displayName = 'Join';
