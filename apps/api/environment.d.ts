declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			COOKIE_SECRET: string;
			CLIENT_HTTPS_HOSTNAME: string;
			CLIENT_HTTP_HOSTNAME: string;
			REDIS_HOST?: string;
			REDIS_PASSWORD: string;
			API_PORT?: string;
			API_BASE_PATH: string;
			API_SUBSCRIPTIONS_PATH: string;
			API_GRAPHQL_PATH: string;
			API_HTTP_HOSTNAME: string;
			API_HTTPS_HOSTNAME: string;
			API_SUBSCRIPTIONS_HOSTNAME: string;
			API_SUBSCRIPTIONS_HOSTNAME_SECURE: string;
		}
	}
}

// added export makes this a module, which is a pre-requisite for the use
// of module augmentations
export {};
