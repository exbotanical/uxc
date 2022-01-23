import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@uxc/types';

import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
	resolvers,
	typeDefs
});
