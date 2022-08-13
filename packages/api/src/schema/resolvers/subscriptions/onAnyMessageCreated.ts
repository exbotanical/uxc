import { SubscriptionResolvers } from '@uxc/common/generated'
import { withFilter } from 'graphql-subscriptions'

import { pubsub } from '@/redis'
import { EVENTS } from '@/utils/constants'

import type { WithMessage } from './types'
import type { MessageWithSender, JWTPayload } from '@uxc/common/node'

export const onAnyMessageCreated = {
  subscribe: withFilter(
    () => pubsub.asyncIterator([EVENTS.MESSAGE_CREATED]),
    (payload: WithMessage, _, ctx: JWTPayload) =>
      payload.message.sender._id !== ctx.id,
  ),
  resolve: ({ message }: { message: MessageWithSender }) => [message],
  // @see https://github.com/apollographql/apollo-server/issues/4556
} as unknown as SubscriptionResolvers['onAnyMessageCreated']
