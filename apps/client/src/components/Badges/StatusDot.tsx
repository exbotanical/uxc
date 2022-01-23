import React from 'react';

import { useOnline } from '@/hooks';

interface StatusDotProps {
	placementClass?: string;
	size?: 'lg' | 'sm';
	sansBorder?: boolean;
	animate?: boolean;
}
export function StatusDot({
	placementClass = '',
	size = 'sm',
	sansBorder = false,
	animate = false
}: StatusDotProps) {
	const { isOnline } = useOnline();
	const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
	const placement =
		placementClass || (size === 'sm' ? 'left-1 top-[-8px]' : 'left-7 mr-2');
	const color = `bg-${isOnline ? 'green-400' : 'accent'}`;
	const border = sansBorder ? '' : 'bottom-0 border-2 border-primary-800';

	return (
		<div className="relative ml-3">
			{animate ? (
				<div
					className={`absolute -mt-1 rounded-full animate-ping ${placement} ${sizeClass} ${color}`}
				/>
			) : null}
			<div
				className={`absolute -mt-1 rounded-full ${border} ${placement} ${sizeClass} ${color}`}
			/>
		</div>
	);
}
