import React from 'react';

interface UserBioProps {
	bio: string;
	className?: string;
}

export function UserBio({ bio, className = '' }: UserBioProps) {
	return (
		<div className={`text-primary-300 mt-3 break-words text-left ${className}`}>
			{bio}
		</div>
	);
}
