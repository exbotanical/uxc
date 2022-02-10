import 'module-alias/register';
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

import type { JWTPayload } from '@uxc/types';

declare module 'express-session' {
	export interface SessionData {
		accessToken: string;
		refreshToken: string;
		meta?: JWTPayload;
	}
}

// we keep this here so we can extract and test
export async function initializeServer() {
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
							console.info('subscription server closing...');
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

	return {
		httpServer,
		server
	};
}
