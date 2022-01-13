import { useConn } from '@/hooks/useConn';
import React from 'react';

export function Status() {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className="flex m-2 ml-3">
			<div className="flex items-center">
				<div className="relative ml-3">
					<div className="absolute top-0 right-0 mr-2 -mt-1 w-2 h-2 rounded-full bg-green-300 animate-ping" />
					<div className="absolute top-0 right-0 mr-2 -mt-1 w-2 h-2 rounded-full bg-green-300" />
				</div>

				<h1 className="text-white opacity-50 text-sm">{user.username}</h1>
			</div>
		</div>
	);
}

Status.displayName = 'Status';
