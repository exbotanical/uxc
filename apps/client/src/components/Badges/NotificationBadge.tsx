import React from 'react';

export function NotificationBadge({
	children,
	className = ''
}: {
	children: JSX.Element;
	className?: string;
}) {
	return (
		<span
			className={`${className} bg-message-100 inline-flex items-center justify-center leading-none font-bold text-xs rounded-md`}
			style={{ height: '1.1rem', width: '1.5rem' }}
		>
			{children}
		</span>
	);
}

NotificationBadge.displayName = 'NotificationBadge';
