import type { ChangeEvent, FormEvent} from 'react';

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import type { User } from '@uxc/types';

import { Button } from '@/components/Buttons/Button';
import { Input } from '@/components/Fields/Input';
import { GET_CURRENT_USER, JOIN } from '@/services/api/queries';

export function Register() {
	const { data, loading } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState<File | null>(null);

	const [join] = useMutation(JOIN);
	const navigate = useNavigate();

	if (loading) {
		return <>Loading...</>;
	}

	if (data) {
		console.log(data);
		return <Navigate to="/thread" />;
	}

	function resetState() {
		setEmail('');
		setPassword('');
		setUsername('');
		setAvatar(null);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		console.log({ email, password, username });
		await join({
			variables: {
				args: {
					email,
					password,
					username,
					userImage: 'avatar'
				}
			}
		});

		resetState();

		navigate(`/thread`);
	}

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		setFile(file);
	};

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

	const setFile = (file: File) => {
		setAvatar(file);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-primary-400 py-12 px-4 sm:px-6 lg:px-8 text-primary">
			<div className="w-full max-w-xl bg-primary-200 pt-5 pb-6 px-6 rounded-lg drop-shadow-sm">
				<div className="flex flex-col justify-center">
					<button className="self-start absolute text-primary-800">
						{'<-'}
					</button>
					<h2 className="text-center text-2xl font-extrabold text-primary-800">
						Create your ux account
					</h2>
					<p className="text-center text-sm text-primary-800">
						to continue to uxc
					</p>
				</div>
				<form className="mt-7 flex flex-col" onSubmit={handleSubmit}>
					<input name="remember" type="hidden" value="true" />

					<div className="rounded-md shadow-sm">
						<div className="mb-2">
							<label className="sr-only" htmlFor="user-name">
								Username
							</label>

							<Input
								autoComplete="username"
								className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 bg-white placeholder-primary-800 text-primary-800 rounded-t-md focus:ring-accent-500  focus:z-10 sm:text-sm"
								id="username"
								name="username"
								onChange={handleChange}
								placeholder="Username"
								required
								type="text"
								value={username}
							/>
						</div>
						<div className="mb-2">
							<label className="sr-only" htmlFor="email-address">
								Email address
							</label>

							<Input
								autoComplete="email"
								className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 bg-white placeholder-primary-800 text-primary-800 rounded-t-md focus:ring-accent-500  focus:z-10 sm:text-sm"
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
								className="appearance-none mb-6 rounded-none relative block w-full px-3 py-2 bg-white placeholder-primary-800 text-primary-800 rounded-b-md focus:ring-accent-500 focus:border-accent-500 focus:z-10 sm:text-sm"
								id="password"
								name="password"
								onChange={handleChange}
								placeholder="Password"
								required
								type="password"
								value={password}
							/>
						</div>

						<div className="mb-6">
							<label className="sr-only" htmlFor="user-name">
								Avatar
							</label>

							<input
								accept=".png,.jpg,.jpeg"
								className="rounded-sm text-white focus:ring-accent-500 focus:z-10 text-md"
								id="avatar"
								name="avatar"
								onChange={handleFileInput}
								required
								type="file"
							/>
						</div>
					</div>

					<Button
						className="relative w-full flex justify-center py-2 px-4 mb-2 text-sm zcrounded-md "
						color="secondary-dark"
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
						Register
					</Button>

					<div className="flex text-sm self-center text-primary-800 gap-1">
						<p>Already have an account?</p>
						<Link
							className="font-medium text-message-500 hover:text-message-400"
							to="/login"
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

Register.displayName = 'Register';
