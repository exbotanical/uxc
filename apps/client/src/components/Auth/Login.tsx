import type { ChangeEvent, FormEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import type { User } from '@uxc/types';

import { Button } from '@/components/Buttons/Button';
import { Input } from '@/components/Fields/Input';
import { GET_CURRENT_USER, LOGIN } from '@/services/api/queries';
import bg from '../../../src/assets/splash.png';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);
	const [login] = useMutation(LOGIN);

	if (loading) {
		return <>Loading...</>;
	}

	if (data) {
		return <Navigate to="/thread" />;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await login({
			variables: {
				args: {
					email,
					password
				}
			}
		});

		setEmail('');
		setPassword('');

		navigate(`/thread`);
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		const executor = name == 'email' ? setEmail : setPassword;

		executor(value);
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
					<div className="mt-1 relative focus-within:border-blue-500">
						<Input
							autoComplete="email"
							id="email-address"
							name="email"
							onChange={handleChange}
							placeholder=" "
							required
							type="email"
							value={email}
							className="block"
						/>
						<label
							htmlFor="email-address"
							style={{
								transformOrigin: '-15% -75%'
							}}
							className="absolute top-0 duration-300 text-primary-200 text-opacity-80 text-xl p-4"
						>
							Email address
						</label>
					</div>

					<div className="mt-8 relative focus-within:border-blue-500">
						<Input
							autoComplete="current-password"
							id="password"
							name="password"
							onChange={handleChange}
							placeholder=" "
							required
							type="password"
							value={password}
							className="block"
						/>
						<label
							htmlFor="password"
							style={{
								transformOrigin: '-15% -75%'
							}}
							className="absolute top-0 duration-300 text-primary-200 text-opacity-80 text-xl p-4"
						>
							Password
						</label>
					</div>

					<Link to="/todo" className="self-end">
						<p className="m-1 font-medium text-primary-100 hover:underline">
							Forgot your password?
						</p>
					</Link>

					<div className="self-center">
						<Button type="submit" width="wide" className="mt-10">
							Sign in
						</Button>
					</div>
				</form>
			</div>

			<div className="flex items-center justify-center">
				<div className="mt-2 flex">
					<Link
						className="text-primary-100 underline text-xl font-bold"
						to="/register"
					>
						<p>Don't have an account?&nbsp;Join now</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

Login.displayName = 'Login';
