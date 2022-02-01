import React from 'react';
import { Channel } from '@/components/ChannelsList/Channel';

/** @todo rerenders when changing chat */
export function ChannelsList({ className = '' }: { className?: string }) {
	return (
		<div className={`text-white grid grid-rows-12 w-7 h-full ${className}`}>
			<ul>
				<Channel />
				<hr className="border-outline mx-2" />
				<Channel />
				<Channel />
				<Channel />
			</ul>
		</div>
	);
}

ChannelsList.displayName = 'ChannelsList';
