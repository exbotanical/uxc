import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from '@uxc/common/node'

import { resolvers } from './registrar'

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
