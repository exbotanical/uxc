interface ImportMeta {
	env: {
		NODE_ENV: 'development' | 'test' | 'production';
		API_GRAPHQL_PATH: string;
		VITE_CY_TEST?: string;
		INSECURE_MODE?: string;
		API_BASE_PATH: string;
		API_SUBSCRIPTIONS_PATH: string;
		API_SUBSCRIPTIONS_HOSTNAME: string;
		API_SUBSCRIPTIONS_HOSTNAME_SECURE: string;
	};
}
