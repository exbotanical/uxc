import React from 'react';

interface UserSiteProps {
	site: string;
	className?: string;
}

export function UserSite({ site, className = '' }: UserSiteProps) {
	return (
		<a
			className={`text-accent mt-3 font-bold ${className}`}
			href={site}
			rel="noreferrer"
			target="_blank"
		>
			{site}
		</a>
	);
}
