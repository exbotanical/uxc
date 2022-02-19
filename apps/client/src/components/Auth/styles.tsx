import { FlexCol, RowCenter } from '@/styles/Layout';
import {
	FontSizeBase,
	FontSizeSm,
	FontSizeXl
} from '@/styles/Typography/FontSize';
import styled from 'styled-components';
import { AdaptiveInput } from '../Fields/AdaptiveInput';
import { Button } from '@/components/Buttons/Button';
import { Link } from 'react-router-dom';

export const RoundedNone = `
	border-radius: 0px;
`;

export const RoundedSm = `
	border-radius: 0.125rem;
`;

export const Rounded = `
	border-radius: 0.25rem;
`;

export const RoundedMd = `
	border-radius: 0.375rem;
`;

export const RoundedLg = `
	border-radius: 0.5rem;
`;

export const RoundedXl = `
	border-radius: 0.75rem;
`;

export const RoundedFull = `
	border-radius: 9999px;
`;

// sm:px-6 lg:px-8
export const Container = styled.div`
	${FlexCol}
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 3rem 1rem;
`;

export const InnerCard = styled.div<{ size: 'sm' | 'lg' }>`
	width: 100%;
	min-height: ${({ size }) => (size === 'sm' ? 22 : 26)}rem;
	max-width: 28rem;
	border-radius: 0.5rem;
	background: ${({ theme }) => theme.colors.background.strong};
	margin-bottom: 3rem;
	padding: 1.75rem;
	box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

export const Form = styled.form`
	${FlexCol}
	border-radius: 0.375rem;
	height: 100%;
`;

export const FieldCaptionLink = styled.p`
	${FontSizeBase}
	margin: 0.5rem;

	&:hover {
		text-decoration-line: underline;
	}
`;

export const SwapModeContainer = styled(RowCenter)`
	margin-top: 0.5rem;
`;

export const BottomInput = styled(AdaptiveInput)`
	margin-top: 1.5rem;
`;

export const CTAButton = styled(Button)`
	margin-top: auto;
	background-color: ${({ theme }) => theme.colors.font.strong};
`;

export const SwapModeLink = styled(Link)`
	${FontSizeXl}
	font-weight: 700;
	text-decoration-line: underline;
`;

export const ErrorText = styled.p`
	${FontSizeSm}
	padding: 1rem;
	text-align: center;
	color: red;
`;
