import React from 'react';
import { createGlobalStyle } from 'styled-components';

import {
	BodyWithStyle,
	ButtonLabelWithStyle,
	CaptionWithStyle,
	CodeWithStyle,
	H1WithStyle,
	H2WithStyle,
	H3WithStyle,
	H4WithStyle,
	H5WithStyle,
	H6WithStyle,
	OverlineWithStyle,
	LinkWithStyle
} from './Element';
import { FontFamily } from './FontFamily';

const TypographyStyles = createGlobalStyle`
	h1 {
		${H1WithStyle}
	}

	h2 {
		${H2WithStyle}
	}

	h3 {
		${H3WithStyle}
	}

	h4 {
		${H4WithStyle}
	}

	h5 {
		${H5WithStyle}
	}

	h6 {
		${H6WithStyle}
	}

	p {
		${BodyWithStyle}
	}

	button {
		${ButtonLabelWithStyle}
	}

	code {
		${CodeWithStyle}
	}

	a {
		${LinkWithStyle}
	}
`;

export const typographyStyles = {
	Body: BodyWithStyle,
	ButtonLabel: ButtonLabelWithStyle,
	Caption: CaptionWithStyle,
	Code: CodeWithStyle,
	H1: H1WithStyle,
	H2: H2WithStyle,
	H3: H3WithStyle,
	H4: H4WithStyle,
	H5: H5WithStyle,
	H6: H6WithStyle,
	Overline: OverlineWithStyle,
	Link: LinkWithStyle
};

export function Typography(): JSX.Element {
	return (
		<>
			<FontFamily />
			<TypographyStyles />
		</>
	);
}
