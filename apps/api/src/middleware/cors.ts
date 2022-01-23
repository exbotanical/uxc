/** @todo raw dev mode (non-containerized) */
export const corsOptions = {
	credentials: true,
	origin: [
		process.env.CLIENT_HTTPS_HOSTNAME!,
		process.env.CLIENT_HTTP_HOSTNAME!,
		'https://studio.apollographql.com'
	]
};

// const corsOptions = {
// 	origin: /\.your.domain\.com$/, // reqexp will match all prefixes
// 	methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
// 	credentials: true, // required to pass
// 	allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
// };
