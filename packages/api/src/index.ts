import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, typeDefs } from './schema';

const pubsub = new PubSub();
const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: { pubsub }
});

server.start(({ port }) => {
	console.info(`Listening on port ${port}....`);
});
