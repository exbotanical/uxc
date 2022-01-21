import { schema } from './schema';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';

import { authOnConnect } from './auth';
import { app } from './app';
import { NotFoundError } from './utils/error';

const PORT = process.env.PORT || 5000;

(async () => {
	const httpServer = createServer(app);
	const subscriptionServer = new SubscriptionServer(
		{
			schema,
			execute,
			subscribe,
			onConnect: authOnConnect
		},
		{ server: httpServer, path: '/graphql' }
	);

	const server = new ApolloServer({
		schema,
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
		]
	});

	await server.start();

	server.applyMiddleware({ app });

	// catchall
	app.all('*', () => {
		throw new NotFoundError();
	});

	httpServer.listen(PORT, () => {
		console.log(
			`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
		);
		console.log(
			`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
		);
	});
})();
