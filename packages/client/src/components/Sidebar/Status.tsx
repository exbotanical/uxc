import React from 'react';

import { StatusDot } from '@/components/Badges/StatusDot';
import { useConn } from '@/hooks/useConn';

export function Status() {
	const { conn } = useConn();
	const { user } = conn!;

	return (
		<div className="flex m-2 ml-3">
			<div className="flex justify-between items-center">
				<StatusDot placementClass="right-1 top-0" />
				<h1 className="text-white text-sm">{user.username}</h1>
			</div>
		</div>
	);
}

Status.displayName = 'Status';
