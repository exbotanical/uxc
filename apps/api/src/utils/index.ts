import { SystemError } from '../middleware';

export function validateConfig() {
	const requiredEnvVars = [
		'COOKIE_SECRET',
		'CLIENT_HTTPS_HOSTNAME',
		'CLIENT_HTTP_HOSTNAME',
		'REDIS_PASSWORD',
		'API_BASE_PATH',
		'API_SUBSCRIPTIONS_PATH',
		'API_GRAPHQL_PATH',
		'API_HTTP_HOSTNAME',
		'API_HTTPS_HOSTNAME',
		'API_SUBSCRIPTIONS_HOSTNAME',
		'API_SUBSCRIPTIONS_HOSTNAME_SECURE'
	];
	for (const envVar of requiredEnvVars) {
		if (process.env[envVar] == null) {
			throw new SystemError(`Environment variable ${envVar} not defined`);
		}
	}
}
