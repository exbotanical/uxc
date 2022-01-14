import React from 'react';

import { useConn } from '@/hooks/useConn';
import { StatusDot } from '@/components/Badges/StatusDot';

export function Status() {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className="flex m-2 ml-3">
			<div className="flex items-center">
				<StatusDot />

				<h1 className="text-white text-sm">{user.username}</h1>
			</div>
		</div>
	);
}

Status.displayName = 'Status';
