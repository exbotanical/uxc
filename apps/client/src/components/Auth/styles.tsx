import { FlexCol, RowCenter } from '@/theme/Layout';
import { FontSizeSm, FontSizeXl } from '@/theme/Typography/FontSize';
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
	background-color: ${(props) => props.theme.colors.primary['600']};
`;

export const InnerCard = styled.div`
	width: 100%;
	max-width: 32rem;
	border-radius: 0.5rem;
	background: ${({ theme }) => theme.colors.indigo['1000']};
	margin-bottom: 3rem;
	padding: 2rem;
	box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

export const Form = styled.form`
	${FlexCol}
	border-radius: 0.375rem;
`;

export const FieldCaptionLink = styled.p`
	margin: 0.5rem;
	${FontSizeSm}

	&:hover {
		text-decoration-line: underline;
	}
`;

export const ButtonContainer = styled.div`
	align-self: center;
`;

export const SwapModeContainer = styled(RowCenter)`
	margin-top: 0.5rem;
`;

export const BottomInput = styled(AdaptiveInput)`
	margin-top: 1rem;
`;

export const CTAButton = styled(Button)`
	margin-top: 2.5rem;
`;

export const SwapModeLink = styled(Link)`
	${FontSizeXl}
	font-weight: 700;
	text-decoration-line: underline;
`;
