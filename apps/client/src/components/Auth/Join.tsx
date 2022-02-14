import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import bg from '../../../src/assets/splash.png';
import { AdaptiveInput } from '../Fields/AdaptiveInput';

import type { User } from '@uxc/types';

import { Button } from '@/components/Buttons/Button';
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

	if (loading) {
		return <>Loading...</>;
	}

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
			}
		}

		executor(name);
	};

	return (
		<div
			className="min-h-screen flex flex-col justify-center items-center bg-primary-600 py-12 px-4 sm:px-6 lg:px-8 text-primary"
			style={{ backgroundImage: `url(${bg})` }}
		>
			<div>
				<h1 className="text-primary-100 text-7xl font-bold mb-4">uxc</h1>
			</div>

			<div className="w-full p-8 mb-12 max-w-lg bg-indigo-1000 rounded-lg">
				<form
					className="flex flex-col rounded-md shadow-sm"
					onSubmit={handleSubmit}
				>
					<AdaptiveInput
						autoComplete="username"
						className="mt-1"
						id="username"
						label="Username"
						name="username"
						onChange={handleChange}
						placeholder=" "
						required
						type="text"
						value={username}
					/>

					<AdaptiveInput
						autoComplete="email"
						className="mt-8"
						id="email-address"
						label="Email address"
						name="email"
						onChange={handleChange}
						placeholder=" "
						required
						type="email"
						value={email}
					/>

					<AdaptiveInput
						autoComplete="current-password"
						className="mt-8"
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						placeholder=" "
						required
						type="password"
						value={password}
					/>

					<div className="self-center">
						<Button className="mt-16" type="submit" width="wide">
							Join
						</Button>
					</div>
				</form>
			</div>

			<div className="flex items-center justify-center">
				<div className="mt-2 flex">
					<Link
						className="text-primary-100 underline text-xl font-bold"
						to="/signin"
					>
						<p>Already have an account?&nbsp;Sign in</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

Join.displayName = 'Join';
