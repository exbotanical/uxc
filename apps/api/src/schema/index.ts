import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@uxc/types/node';

import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
	resolvers,
	typeDefs
});
