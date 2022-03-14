import React from 'react';
import {
	DefaultTheme,
	ThemeProvider as StyledThemeProvider
} from 'styled-components';

import { colors } from './colors';
import { Reset } from './Reset';
import { Typography } from './Typography';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: typeof colors;
	}
}

interface ThemeProps {
	children: React.ReactNode;
}

const theme: DefaultTheme = {
	colors
};

export function ThemeProvider({ children }: ThemeProps): JSX.Element {
	return (
		<StyledThemeProvider theme={theme}>
			<Reset />
			<Typography />
			{children}
		</StyledThemeProvider>
	);
}

export * from './Primitives';
export * from './Typography';
