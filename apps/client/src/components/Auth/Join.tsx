import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import type { User } from '@uxc/types';

import { Button } from '@/components/Buttons/Button';
import { GET_CURRENT_USER, JOIN } from '@/services/api/queries';
import bg from '../../../src/assets/splash.png';
import { AdaptiveInput } from '../Fields/AdaptiveInput';

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

		navigate(`/thread`);
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
			style={{ backgroundImage: `url(${bg})` }}
			className="min-h-screen flex flex-col justify-center items-center bg-primary-600 py-12 px-4 sm:px-6 lg:px-8 text-primary"
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
						id="username"
						name="username"
						onChange={handleChange}
						placeholder=" "
						required
						type="text"
						value={username}
						className="mt-1"
						label="Username"
					/>

					<AdaptiveInput
						autoComplete="email"
						id="email-address"
						name="email"
						onChange={handleChange}
						placeholder=" "
						required
						type="email"
						value={email}
						className="mt-8"
						label="Email address"
					/>

					<AdaptiveInput
						autoComplete="current-password"
						id="password"
						name="password"
						onChange={handleChange}
						placeholder=" "
						required
						type="password"
						value={password}
						className="mt-8"
						label="Password"
					/>

					<div className="self-center">
						<Button type="submit" width="wide" className="mt-16">
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
