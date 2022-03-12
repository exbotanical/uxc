import 'styled-components';

interface ImportMeta {
	env: {
		NODE_ENV: 'development' | 'production' | 'test';
		VITE_API_GRAPHQL_PATH: string;
		VITE_CY_TEST?: string;
		VITE_API_BASE_PATH: string;
		VITE_API_HTTP_HOSTNAME: string;
		VITE_API_HTTPS_HOSTNAME: string;
		VITE_API_SUBSCRIPTIONS_PATH: string;
		VITE_API_SUBSCRIPTIONS_HOSTNAME: string;
		VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE: string;
	};
}

declare module 'styled-components' {
	type Palettes =
		| 'accent'
		| 'background'
		| 'background'
		| 'blue'
		| 'border'
		| 'error'
		| 'field'
		| 'font'
		| 'interactive'
		| 'interactive'
		| 'link'
		| 'scrollbar'
		| 'success';

	export interface DefaultTheme {
		colors: {
			[K in Palettes]: {
				[k: string]: string;
				norm: string;
				weak: string;
				strong: string;
				disabled: string;
				hover: string;
				active: string;
				dark: string;
			};
		};
	}
}
