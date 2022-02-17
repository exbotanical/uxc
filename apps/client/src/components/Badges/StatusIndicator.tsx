import React from 'react';
import styled, { css, keyframes } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';
interface StatusIndicatorProps {
	size?: Size;
	sansBorder?: boolean;
	animate?: boolean;
}

const SizeMap = {
	sm: `
  left: 1rem;
	width: 1rem;
	height: 1rem;
`,
	md: `
  left: 1.25rem;
	width: 1.25rem;
	height: 1.25rem;
`,
	lg: `
  left: 1.5rem;
	width: 1.25rem;
	height: 1.25rem;
`
};

const Container = styled.div`
	position: relative;
	margin-left: 0.75rem;
`;

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const IndicatorBase = styled.div<{ size: Size }>`
	position: absolute;
	bottom: 0px;
	margin-top: -0.25rem;
	border-radius: 9999px;
	background-color: ${({ theme }) => theme.colors.accent['600']};
	${({ size }) => SizeMap[size]}
`;

const AnimatedIndicatorOverlay = styled(IndicatorBase)`
	animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`;

const Indicator = styled(IndicatorBase)<{
	sansBorder: boolean;
}>`
	${({ sansBorder }) => (sansBorder ? {} : Border)};
`;

const Border = css`
	border-width: 2px;
	border-color: ${({ theme }) => theme.colors.primary['800']};
`;

export function StatusIndicator({
	size = 'md',
	sansBorder = false,
	animate = false
}: StatusIndicatorProps) {
	return (
		<Container>
			{animate ? <AnimatedIndicatorOverlay size={size} /> : null}
			<Indicator size={size} sansBorder={sansBorder} />
		</Container>
	);
}

StatusIndicator.displayName = 'StatusIndicator';
