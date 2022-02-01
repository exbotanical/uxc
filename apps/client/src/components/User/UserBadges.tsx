import React from 'react';

export function UserBadges({ className = '' }: { className?: string }) {
	return (
		<span className={`flex self-start text-primary-100 ${className}`}>
			🏆 🎁 ⏱️
		</span>
	);
}

UserBadges.displayName = 'UserBadges';
