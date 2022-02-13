import React from 'react';

import { Channel } from '@/components/Channel/Channel';

/** @todo rerenders when changing chat */
export function ChannelsList({ className = '' }: { className?: string }) {
	return (
		<div className={`flex w-28 text-white h-full ${className}`}>
			<ul>
				<Channel />
				<hr className="border-outline" />
				<Channel />
				<Channel />
				<Channel />
			</ul>
		</div>
	);
}

ChannelsList.displayName = 'ChannelsList';
