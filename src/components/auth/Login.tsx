import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import type { FC } from 'react';

import { useConn } from '@/hooks/useConn';
import { SessionContext } from '@/context';

export const Login: FC = () => {
	const history = useHistory();

	const { isAuthenticated, setUserSession } = useContext(SessionContext);
	const { setUser } = useConn();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	if (isAuthenticated) {
		return <Redirect to={'/dashboard'} />;
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:5001/api', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			try {
				const { accessToken, user } = await response.json();

				setUserSession(accessToken);
				setUser(user);

				setEmail('');
				setPassword('');

				history.push(`/channel/${user.currentChannel.uuid}`);
			} catch (ex) {
				console.warn('authentication failed; TODO tell the user about this', {
					ex
				});
			}
		} catch (ex) {
			console.warn('service error; TODO do something about this', { ex });
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		const executor = name == 'email' ? setEmail : setPassword;

		executor(value);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-primary-800 py-12 px-4 sm:px-6 lg:px-8 text-primary">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-primary-100">
						Login to join the chat
					</h2>
					<p className="mt-2 text-center text-sm text-primary-100">
						Or&nbsp;
						<a
							href="/todo"
							className="font-medium text-accent-disabled hover:text-accent"
						>
							Create an Account
						</a>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white-300 placeholder-white-500 text-primary-900 rounded-t-md focus:outline-none focus:ring-accent-500 focus:border-accent-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white-300 placeholder-white-500 text-primary-900 rounded-b-md focus:outline-none focus:ring-accent-500 focus:border-accent-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-accent focus:ring-accent border-white rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-primary-100"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								href="/todo"
								className="font-medium text-accent-disabled hover:text-accent"
							>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-100 bg-accent hover:bg-secondary hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-accent-disabled group-hover:text-accent"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

Login.displayName = 'Login';
