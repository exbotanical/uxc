import { createGlobalStyle } from 'styled-components';
import { FontFamilyBase, FontFamilyCode } from './Typography/FontFamily';

export const Reset = createGlobalStyle<{
	theme: { colorbg: string; colortext: string };
}>`
	body,
	html {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-color: ${({ theme }) => theme.colors.primary['1200']};

	}

	* {
		${FontFamilyBase}
		scrollbar-color: ${({ theme }) =>
			theme.colors.primary['1100']} rgba(0, 0, 0, 0);
		scrollbar-width: thin;
	}

	*,
	::before,
	::after {
		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
	}

	::-webkit-scrollbar {
		overflow: overlay;
		width: 8px;
	}

	::-webkit-scrollbar-track {
		display: initial;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.primary['1200']};
		border-radius: 2px;
	}

	::-webkit-resizer {
		background-color: ${({ theme }) => theme.colors.primary['1200']};
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
		padding: 0;
		margin: 0;
	}

	p {
		word-break: break-word;
	}

	img,
	svg {
		display: block;
		vertical-align: middle;
	}

	img,
	video {
		max-width: 100%;
		height: auto;
	}

	button {
		cursor: pointer;
	}

	button,
	[type='button'],
	[type='reset'],
	[type='submit'] {
		-webkit-appearance: button;
		background-color: transparent;
		background-image: none;
	}

	textarea {
		${FontFamilyCode}
	}
`;
