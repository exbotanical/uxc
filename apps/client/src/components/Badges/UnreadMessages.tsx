import React from 'react';
import { NotificationBadge } from './NotificationBadge';

interface UnreadMessagesBadgeProps {
	newMessages: number;
}

const THRESHOLD = 10;

export function UnreadMessagesBadge({ newMessages }: UnreadMessagesBadgeProps) {
	if (!newMessages) {
		return null;
	}

	const manyMessages = newMessages > THRESHOLD;
	const formattedCount = manyMessages ? `${THRESHOLD}+` : newMessages;
	const badgeSize = manyMessages ? 'w-7 h-5' : 'w-5 h-5';

	return (
		<span
			className={`bg-message-100 inline-flex items-center justify-center leading-none font-bold text-xs rounded-full relative left-7 bottom-5 ${badgeSize}`}
		>
			<p>{formattedCount}</p>
		</span>
	);
}
UnreadMessagesBadge.displayName = 'UnreadMessagesBadge';
