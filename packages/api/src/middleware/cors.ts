export const corsOptions = {
	credentials: true,
	origin: [
		process.env.CLIENT_HTTPS_HOSTNAME,
		process.env.CLIENT_HTTP_HOSTNAME,
		'https://studio.apollographql.com'
	]
};
