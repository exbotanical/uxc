import { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle<{
	theme: { colorbg: string; colortext: string };
}>`
	body,
	html {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background-color: theme('colors.primary.1200');
	}

	* {
		/* Firefox */
		scrollbar-color: theme('colors.primary.1100') rgba(0, 0, 0, 0);
		scrollbar-width: thin;
	}


	::-webkit-scrollbar {
		overflow: overlay;
		width: 8px;
	}

	::-webkit-scrollbar-track {
		display: initial;
	}

	::-webkit-scrollbar-thumb {
		background-color: theme('colors.primary.1200');
		border-radius: 5px;
	}

	::-webkit-resizer {
		background: theme('colors.primary.1200');
	}

	input:focus-within ~ label,
	input:not(:placeholder-shown) ~ label {
		@apply transform scale-75 -translate-y-6;
	}

	input:focus-within ~ label {
		@apply text-blue-500;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
		padding: 0;
		margin: 0;
	}

	body {
		width: inherit;
		height: inherit;
		padding: 0;
		margin: 0;
	}

	p {
		word-break: break-word;
	}
`;
