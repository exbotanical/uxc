import React from 'react';

import { UserCard } from '../User/UserCard';

import { useConn } from '@/hooks/useConn';

export function Profile() {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className="flex flex-col rounded-8 bg-primary-800 p-4 w-full">
			<button className="flex" type="button">
				<div className="flex">
					<div className="relative inline-block">
						<span className="rounded-full absolute box-content bg-accent border-primary-800" />
					</div>
				</div>

				<div className="flex mt-2">
					<div className="flex flex-col ml-3">
						<span className="text-primary-100 font-bold overflow-hidden break-all text-left">
							<UserCard isOnline size="default" u={user} />
						</span>

						<span className="text-primary-300 text-left break-all">
							@{user.username}
						</span>

						<span className="flex mt-1">badgies</span>
					</div>
				</div>
			</button>

			<div className="flex mt-3">
				<div className="flex transition duration-200 ease-in-out hover:bg-primary-700 py-1 rounded-8">
					<span className="text-primary-100 font-bold">200</span>

					<span className="text-primary-300 ml-1.5 lowercase">followers</span>
				</div>

				<div className="flex transition duration-200 ease-in-out hover:bg-primary-700 px-2 py-1 rounded-8">
					<span className="text-primary-100 font-bold">500</span>

					<span className="text-primary-300 ml-1.5 lowercase">following</span>
				</div>
			</div>

			<div className="flex text-primary-300 mt-3 break-words text-left">
				bio
			</div>

			<a
				className="text-accent mt-3 font-bold"
				href="/"
				rel="noreferrer"
				target="_blank"
			>
				mysite
			</a>
		</div>
	);
}

export interface ProfileBlockProps {
	top: React.ReactNode;
	bottom: React.ReactNode;
}

export function RightPanel({ top, bottom }: ProfileBlockProps) {
	return (
		<div className="flex flex-1 flex-col overflow-y-auto">
			<div className="flex justify-between items-end mb-5 max-w-md">{top}</div>

			<div className="flex justify-between items-end mb-5 max-w-md">
				{bottom}
			</div>
		</div>
	);
}
