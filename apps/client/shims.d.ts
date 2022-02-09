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
