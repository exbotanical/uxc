/* eslint-disable @typescript-eslint/require-await */
import './dotenv';
import { createServer } from 'http';

import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { app } from './app';
import { corsOptions, errorhandler, NotFoundError } from './middleware';
import { schema } from './schema';
import { validateConfig } from './utils';
import { User } from '@uxc/types';

declare module 'express-session' {
	export interface SessionData {
		accessToken: string;
		refreshToken: string;
	}
}

declare module 'express-serve-static-core' {
	export interface Request {
		user?: User;
	}
}

const PORT = process.env.API_PORT || 5000;

async function main() {
	const httpServer = createServer(app);

	const server = new ApolloServer({
		context: ({ req }) => {
			return { req };
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						}
					};
				}
			},
			ApolloServerPluginLandingPageLocalDefault({
				footer: true
			})
		],
		schema
	});

	await server.start();
	server.applyMiddleware({
		app,
		cors: corsOptions
	});

	const subscriptionServer = new SubscriptionServer(
		{
			execute,
			schema,
			subscribe
		},
		{
			path: process.env.VITE_API_SUBSCRIPTIONS_PATH,
			server: httpServer
		}
	);

	app
		.all('*', () => {
			throw new NotFoundError();
		})
		.use(errorhandler);

	httpServer.listen(PORT, () => {
		console.info(
			`\n🚀 Query endpoint listening at http://localhost:${PORT}${server.graphqlPath}`
		);

		console.info(
			`🚀 Subscription endpoint listening at ws://localhost:${PORT}${server.graphqlPath}`
		);

		console.info(
			`🚀 GraphQL Explorer listening at http://localhost:${PORT}${server.graphqlPath}\n`
		);
	});
}

(async () => {
	validateConfig();
	await main();
})();

process.on('unhandledRejection', (reason) => {
	console.log('Unhandled', { reason });
	// throw reason;
});
