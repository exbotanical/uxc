import { css } from 'styled-components';

import { colors } from '../colors';
import { BREAKPOINTS } from '../Layout';

import { FontFamilyBase, FontFamilyCode, FontFamilyCode2 } from './FontFamily';
import {
	FontSize2Xl,
	FontSize7Xl,
	FontSizeBase,
	FontSizeLg,
	FontSizeXl,
	FontSizeXs
} from './FontSize';

export const MobileH1 = css`
	${FontFamilyBase}
	font-size: 32px;
	font-weight: normal;
	letter-spacing: 0.25px;
	line-height: 40px;
`;

export const MobileH2 = css`
	${FontFamilyBase}
	font-size: 29px;
	font-weight: normal;
	letter-spacing: 0;
	line-height: 40px;
`;

export const MobileH3 = css`
	${FontFamilyBase}
	${FontSize2Xl}
	font-weight: normal;
	letter-spacing: 0.15px;
	line-height: 32px;
`;

export const MobileH4 = css`
	${FontFamilyBase}
	${FontSize2Xl}
	font-weight: normal;
	letter-spacing: 0.25px;
	line-height: 32px;
`;

export const MobileH5 = css`
	${FontFamilyBase}
	${FontSizeXl}
	font-weight: normal;
	letter-spacing: 0.35px;
`;

export const MobileH6 = css`
	${FontFamilyBase}
	${FontSizeLg}
	font-weight: normal;
	letter-spacing: 0.4px;
`;

export const MobileBody = css`
	${FontFamilyCode}
	${FontSizeBase}
	font-weight: normal;
	letter-spacing: 0.5px;
`;

export const MobileCaption = css`
	${FontFamilyCode}
	${FontSizeXs}
	font-weight: normal;
	letter-spacing: 0.5px;
`;

export const MobileOverline = css`
	${FontFamilyCode}
	${FontSizeXs}
	font-weight: 500;
	letter-spacing: 1.5px;
	line-height: 16px;
	text-transform: uppercase;
`;

export const MobileCode = css`
	${FontFamilyCode2}
	font-size: 14px !important;
	line-height: 21px !important;
`;

export const MobileLink = css`
	${FontFamilyCode}
	${FontSizeBase}
	letter-spacing: 0.5px;
	color: ${({ theme }) => theme.colors.font.strong};

	&:hover {
		text-decoration-line: underline;
	}
`;

export const DesktopH1 = css`
	${FontFamilyBase}
	${FontSize7Xl}
	font-weight: 700;
	color: ${({ theme }) => theme.colors.font.strong};
	margin-bottom: 1rem;
`;

export const DesktopH2 = `
	${FontFamilyBase}
	font-size: 39px;
	font-weight: normal;
	line-height: 48px;
`;

export const DesktopH3 = `
	${FontFamilyBase}
	font-size: 33px;
	font-weight: normal;
	letter-spacing: 0.15px;
	line-height: 40px;
`;

export const DesktopH4 = `
	${FontFamilyBase}
	font-size: 27px;
	font-weight: normal;
	letter-spacing: 0.25px;
	line-height: 32px;
`;

export const DesktopH5 = `
	${FontFamilyBase}
	font-size: 23px;
	font-weight: normal;
	letter-spacing: 0.35px;
	line-height: 32px;
`;

export const DesktopH6 = `
	${FontFamilyBase}
	${FontSizeXl}
	font-weight: normal;
	letter-spacing: 0.4px;
`;

export const DesktopBody = css`
	${FontFamilyCode}
	${FontSizeLg}
	font-weight: normal;
	letter-spacing: 0.5px;
`;

export const DesktopCaption = css`
	${FontFamilyCode}
	font-size: 14px;
	font-weight: normal;
	letter-spacing: 0.4px;
	line-height: 16px;
`;

export const DesktopOverline = css`
	${FontFamilyCode}
	${FontSizeXs}
	font-weight: 500;
	letter-spacing: 1.5px;
	text-transform: uppercase;
`;

export const DesktopCode = css`
	${FontFamilyCode2}
	${FontSizeBase}
`;

export const DesktopLink = css`
	${FontFamilyCode}
	${FontSizeLg}
	font-weight: normal;
	color: ${({ theme }) => theme.colors.font.strong};

	&:hover {
		text-decoration-line: underline;
	}
`;

export const H1WithStyle = css`
	${MobileH1}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH1}
	}
`;

export const H2WithStyle = css`
	${MobileH2}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH2}
	}
`;

export const H3WithStyle = css`
	${MobileH3}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH3}
	}
`;

export const H4WithStyle = css`
	${MobileH4}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH4}
	}
`;

export const H5WithStyle = css`
	${MobileH5}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH5}
	}
`;

export const H6WithStyle = css`
	${MobileH6}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopH6}
	}
`;

export const BodyWithStyle = css`
	${MobileBody}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopBody}
	}
`;

export const CaptionWithStyle = css`
	${MobileCaption}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopCaption}
	}
`;

export const OverlineWithStyle = css`
	${MobileOverline}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopOverline}
	}
`;

export const CodeWithStyle = css`
	${MobileCode}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopCode}
	}
`;

export const LinkWithStyle = css`
	${MobileLink}
	@media (min-width: ${BREAKPOINTS.sm}) {
		${DesktopLink}
	}
`;

export const ButtonLabelWithStyle = css`
	${FontFamilyCode}
	${FontSizeLg}
	font-style: normal;
	font-weight: 500;
	letter-spacing: 1.25px;
	text-transform: uppercase;
`;
