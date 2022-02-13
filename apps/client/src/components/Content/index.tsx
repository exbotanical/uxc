import React from 'react';
import { useParams } from 'react-router-dom';

import { ConnectedChatRoom as ChatRoom } from '@/components/ChatRoom';
import { Input } from '@/components/Fields/Input';
import SvgIcon from '@/components/Icon';

export function ContentContainer() {
	const { threadId } = useParams();
	const isIndexThread = threadId == null;

	return (
		<div className="flex flex-col items-center w-full bg-primary-1000">
			<header
				className="flex justify-start gap-2 items-center border-b-2 border-primary-1200 w-full p-4"
				style={{ minHeight: '75px', height: '75px' }}
			>
				<SvgIcon name="people" dimensions={21} />
				<p className="text-primary-100 text-xl font-bold">Friends</p>
			</header>

			<div className="flex h-screen overflow-hidden w-full justify-center">
				{isIndexThread ? (
					<div className="place-self-center flex flex-col items-center">
						<Input
							placeholder="Search friends"
							className="text-primary-200 bg-primary-1300 text-lg w-1/2 h-9 mb-12"
						/>

						<ul className="grid grid-cols-4">
							{[1, 2, 3, 4, 5].map((i) => {
								return (
									<li
										className="flex flex-col justify-center items-center m-8"
										key={i}
									>
										<div className="rounded-full bg-blue-100 h-20 w-20 mb-2" />
										<h4 className="text-md font-bold text-primary-100">
											{i === 1 ? 'DeidaraDeidara' : 'Deidara'}
										</h4>
										<p className="text-xs font-bold text-primary-200">
											user status
										</p>
										<div className="flex justify-evenly my-2 gap-1">
											<div className="rounded-full bg-primary-1200 h-8 w-8"></div>
											<div className="rounded-full bg-primary-1200 h-8 w-8"></div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					<ChatRoom threadId={threadId} />
				)}
			</div>
		</div>
	);
}
