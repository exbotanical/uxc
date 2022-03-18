import React from 'react';
import styled from 'styled-components';

interface SvgIconProps {
	name: string;
	size?: number;
	color?: string;
}

const IconWrapper = styled.svg<{ color: string }>`
	color: ${({ color }) => color} !important;
`;

export default function SvgIcon({
	name,
	size = 12,
	color = 'white',
	...props
}: SvgIconProps) {
	const symbolId = `#icon-${name}`;

	return (
		<IconWrapper
			color={color}
			{...props}
			aria-hidden="true"
			height={size}
			width={size}
		>
			<use href={symbolId} />
		</IconWrapper>
	);
}
