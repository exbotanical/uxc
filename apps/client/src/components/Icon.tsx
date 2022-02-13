import React from 'react';

interface SvgIconProps {
	name: string;
	dimensions?: number;
	color?: string;
}

export default function SvgIcon({
	name,
	dimensions = 12,
	color = 'white',
	...props
}: SvgIconProps) {
	const symbolId = `#icon-${name}`;

	return (
		<svg {...props} aria-hidden="true" width={dimensions} height={dimensions}>
			<use href={symbolId} fill={color} />
		</svg>
	);
}
