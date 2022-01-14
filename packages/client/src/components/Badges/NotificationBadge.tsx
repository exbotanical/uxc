import React from 'react';

export function NotificationBadge({ children }: { children: JSX.Element }) {
	return (
		<span
			className="bg-accent inline-flex items-center justify-center leading-none font-bold text-xs rounded-8"
			style={{ height: '1.1rem', width: '1.5rem' }}
		>
			{children}
		</span>
	);
}
