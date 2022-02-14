import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SvgIcon from '../Icon';
import { ConnectedChatRoom as ChatRoom } from '../ChatRoom';
import { Friends } from '../Friends';

export function ContentLayout() {
	return (
		<div className="flex flex-col items-center w-full bg-primary-1000">
			<header
				className="flex justify-start gap-2 items-center border-b-2 border-primary-1200 w-full p-4"
				style={{ minHeight: '75px', height: '75px' }}
			>
				<SvgIcon name="people" dimensions={21} />
				<p className="text-primary-100 text-xl font-bold">Friends</p>
			</header>

			<div className="flex overflow-hidden h-full w-full justify-center">
				<Routes>
					<Route path="/" element={<Friends />} />
					<Route path="/:threadId" element={<ChatRoom />} />
				</Routes>
			</div>
		</div>
	);
}
