import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AdaptiveInput } from '../Fields/AdaptiveInput';

import { Button } from '@/components/Buttons/Button';
import { FlexCol, RowCenter } from '@/styles/Layout';
import { FontSizeBase, FontSizeXl } from '@/styles/Typography/FontSize';

export const Container = styled.div`
	${FlexCol}
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const InnerCard = styled.div<{ size: 'lg' | 'sm' }>`
	${FlexCol}
	position: relative;
	width: 100%;
	min-height: ${({ size }) => (size === 'sm' ? 32 : 36)}rem;
	max-width: 32rem;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background.strong};
`;

export const Form = styled.form`
	${FlexCol}
	padding: 0 1.75rem;
	padding-top: 5rem;
	padding-bottom: 1.5rem;
	height: 100%;
`;

export const FieldCaptionLink = styled.p`
	${FontSizeBase}
	margin: 0.5rem;

	&:hover {
		text-decoration-line: underline;
	}
`;

export const Footer = styled(RowCenter)`
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 1px solid ${({ theme }) => theme.colors.border.norm};
	padding: 1rem 0;
`;

export const CTAButton = styled(Button)`
	margin-top: auto;
	background-color: ${({ theme }) => theme.colors.font.strong};
`;

export const SwapModeLink = styled(Link).attrs({
	'data-testid': 'swapmode-button'
})`
	${FontSizeXl}
	font-weight: 700;
	text-decoration-line: underline;
`;
