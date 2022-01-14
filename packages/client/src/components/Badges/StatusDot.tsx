import { useOnline } from '@/hooks';
import React from 'react';

interface StatusDotProps {
	size?: 'sm' | 'lg';
}
export function StatusDot({ size = 'sm' }: StatusDotProps) {
	const { isOnline } = useOnline();
	const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-4 h-4';
	const placementClass = size === 'sm' ? 'left-2 mr-2' : 'left-7 mr-2';
	const color = `bg-${isOnline ? 'green-300' : 'accent'}`;

	return (
		<div className="relative ml-3">
			<div
				className={`absolute bottom-0 ${placementClass} -mt-1 ${sizeClass} rounded-full ${color} animate-ping`}
			/>

			<div
				className={`absolute bottom-0 ${placementClass} -mt-1 ${sizeClass} rounded-full ${color}`}
			/>
		</div>
	);
}
