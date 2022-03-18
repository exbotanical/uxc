declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			COOKIE_SECRET: string;
			CLIENT_HTTPS_HOSTNAME: string;
			CLIENT_HTTP_HOSTNAME: string;
			REDIS_HOST?: string;
			REDIS_PASSWORD: string;
			API_PORT?: string;
			VITE_API_BASE_PATH: string;
			VITE_API_SUBSCRIPTIONS_PATH: string;
			VITE_API_GRAPHQL_PATH: string;
			VITE_API_HTTP_HOSTNAME: string;
			VITE_API_HTTPS_HOSTNAME: string;
			VITE_API_SUBSCRIPTIONS_HOSTNAME: string;
			VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE: string;
			ACCESS_TOKEN_SIGNING_KEY: string;
			REFRESH_TOKEN_SIGNING_KEY: string;
			JWT_AUTHORITY: string;
		}
	}
}

export {};
