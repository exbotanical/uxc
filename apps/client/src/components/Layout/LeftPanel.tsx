import React from 'react';

interface PanelProps {
	top: React.ReactNode;
	bottom: React.ReactNode;
	className?: string;
}

export function Panel({ top, bottom, className = '' }: PanelProps) {
	return (
		// <div className={`flex flex-1 flex-col overflow-y-auto ${className}`}>
		// 	<div className="flex justify-between items-end max-w-md">{top}</div>

		// 	<div className="flex justify-between items-end mt-5 max-w-md">
		// 		{bottom}
		// 	</div>
		// </div>

		<div className="flex w-full">
			{top}
			{bottom}
		</div>
	);
}

Panel.displayName = 'Panel';
