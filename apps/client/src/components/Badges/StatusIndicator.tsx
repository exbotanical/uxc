import React from 'react';

interface StatusIndicatorProps {
	placementClass?: string;
	sansBorder?: boolean;
	animate?: boolean;
}

export function StatusIndicator({
	placementClass = '',
	sansBorder = false,
	animate = false
}: StatusIndicatorProps) {
	const color = 'bg-green-400 w-3 h-3';
	const border = sansBorder ? '' : 'bottom-0 border-2 border-primary-800';

	return (
		<div className="relative ml-3">
			{animate ? (
				<div
					className={`absolute -mt-1 rounded-full animate-ping ${placementClass} ${color}`}
				/>
			) : null}
			<div
				className={`absolute -mt-1 rounded-full ${border} ${placementClass} ${color}`}
			/>
		</div>
	);
}

StatusIndicator.displayName = 'StatusIndicator';
