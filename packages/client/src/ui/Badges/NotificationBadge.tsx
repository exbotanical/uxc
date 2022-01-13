import React from 'react';

export function NotificationBadge({ children }: { children: JSX.Element }) {
	return (
		<span
			style={{ height: '1.1rem', width: '1.5rem' }}
			className="bg-accent inline-flex items-center justify-center leading-none font-bold text-xs rounded-8"
		>
			{children}
		</span>
	);
}
