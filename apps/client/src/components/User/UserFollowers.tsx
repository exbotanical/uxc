import React from 'react';

interface UserFollowersProps {
	className?: string;
	followers: number;
	following: number;
}

export function UserFollowers({
	followers,
	following,
	className = ''
}: UserFollowersProps) {
	return (
		<div className={`flex ${className}`}>
			<Followers followers={followers} />
			<Following following={following} />
		</div>
	);
}

UserFollowers.displayName = 'UserFollowers';

export function Followers({ followers }: { followers?: number }) {
	return (
		<div className="flex transition duration-200 ease-in-out hover:bg-primary-700 py-1 rounded-8">
			<span className="text-primary-100 font-bold">{followers ?? 0}</span>

			<span className="text-primary-300 ml-1.5">Followers</span>
		</div>
	);
}

Followers.displayName = 'Followers';

function Following({ following }: { following?: number }) {
	return (
		<div className="flex transition duration-200 ease-in-out hover:bg-primary-700 px-2 py-1 rounded-8">
			<span className="text-primary-100 font-bold">{following ?? 0}</span>

			<span className="text-primary-300 ml-1.5">Following</span>
		</div>
	);
}

Following.displayName = 'Following';
