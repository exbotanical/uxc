import { useConn } from '@uxc/client/hooks/useConn';
import React from 'react';


export function Status() {
	const { conn } = useConn();
	const { user } = conn;

	return (
		<div className="border-b border-outline flex px-3 py-2 mt-2 justify-between">
			<div className="flex items-center mb-2">
				<svg
					className="h-2 w-2 fill-current text-green-400 mr-2"
					viewBox="0 0 20 20"
				>
					<circle cx="10" cy="10" r="10" />
				</svg>

				<h1 className="text-white opacity-50 text-sm">{user.username}</h1>
			</div>
		</div>
	);
}

Status.displayName = 'Status';
