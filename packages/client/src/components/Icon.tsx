import React from 'react';
import styled from 'styled-components';

interface SvgIconProps {
	name: string;
	size?: number;
	color?: string;
	fill?: string;
	hoverColor?: string;
}

const IconWrapper = styled.svg<{ color: string; hoverColor: string }>`
	color: ${({ color }) => color} !important;

	&:hover {
		color: ${({ hoverColor }) => hoverColor} !important;
	}
`;

export default function SvgIcon({
	name,
	size = 12,
	color = 'white',
	fill = 'none',
	hoverColor = '',
	...props
}: SvgIconProps) {
	const symbolId = `#icon-${name}`;

	return (
		<IconWrapper
			aria-hidden="true"
			color={color}
			fill={fill}
			height={size}
			hoverColor={hoverColor || color}
			width={size}
			{...props}
		>
			<use fill={fill} href={symbolId} />
		</IconWrapper>
	);
}
