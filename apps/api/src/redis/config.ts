const LOOPBACK = '127.0.0.1';
const REDIS_PORT = 6379;

export const options = {
	host: process.env.INSECURE_MODE
		? LOOPBACK
		: process.env.REDIS_HOST || LOOPBACK,
	port: REDIS_PORT,
	...(process.env.INSECURE_MODE
		? {}
		: { password: process.env.REDIS_PASSWORD! }),
	retryStrategy: (attempts: number) => {
		return Math.min(attempts * 50, 2000);
	}
};
