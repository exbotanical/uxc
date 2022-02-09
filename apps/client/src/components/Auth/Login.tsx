import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import type { User } from '@uxc/types';

import { Button } from '@/components/Buttons/Button';
import { Input } from '@/components/Fields/Input';
import { GET_USER, LOGIN } from '@/services/api/queries';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_USER);
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
		<div className="min-h-screen flex  items-center justify-center bg-primary-400 py-12 px-4 sm:px-6 lg:px-8 text-primary">
			<div className="w-full max-w-xl space-y-8 bg-primary-700 p-8 rounded-lg drop-shadow-sm">
				<div>
					<h2 className="mt-6 text-center text-4xl font-extrabold text-primary-100">
						Login to join the chat
					</h2>

					<p className="mt-2 text-center text-xl text-primary-100">
						Or&nbsp;
						<Link
							className="font-medium text-accent hover:text-accent-disabled"
							to="/register"
						>
							Create an Account{' '}
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<input name="remember" type="hidden" value="true" />

					<div className="rounded-md shadow-sm">
						<div className="mb-2">
							<label className="sr-only" htmlFor="email-address">
								Email address
							</label>

							<Input
								autoComplete="email"
								className="appearance-none rounded-none relative block w-full px-3 py-2 bg-primary-600 placeholder-white-500 text-primary-200 rounded-t-md  focus:ring-accent-500  focus:z-10 sm:text-sm"
								id="email-address"
								name="email"
								onChange={handleChange}
								placeholder="Email address"
								required
								type="email"
								value={email}
							/>
						</div>

						<div>
							<label className="sr-only" htmlFor="password">
								Password
							</label>

							<Input
								autoComplete="current-password"
								className="appearance-none rounded-none relative block w-full px-3 py-2 bg-primary-600 placeholder-white-500 text-primary-200 rounded-b-md  focus:ring-accent-500 focus:border-accent-500 focus:z-10 sm:text-sm"
								id="password"
								name="password"
								onChange={handleChange}
								placeholder="Password"
								required
								type="password"
								value={password}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								className="h-4 w-4 text-accent focus:ring-accent rounded"
								id="remember-me"
								name="remember-me"
								type="checkbox"
							/>

							<label
								className="ml-2 block text-sm text-primary-100"
								htmlFor="remember-me"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								className="font-medium text-accent hover:text-accent-disabled"
								href="/todo"
							>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<Button
							className=" relative w-full flex justify-center py-2 px-4 text-sm  rounded-md"
							type="submit"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									aria-hidden="true"
									className="h-5 w-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										fillRule="evenodd"
									/>
								</svg>
							</span>
							Login
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

Login.displayName = 'Login';
