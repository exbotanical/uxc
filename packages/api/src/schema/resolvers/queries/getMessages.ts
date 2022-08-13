import { Message } from '@/db'

import type { Resolver } from '../types'
import type { Message as MessageType, ObjectID } from '@uxc/common/node'

/**
 * @todo paginate
 * @todo deduplicate sender
 */
export const getMessages: Resolver<MessageType[], { threadId: ObjectID }> =
  async (_, { threadId }) => {
    const messages = await Message.find({ threadId }).populate('sender')

    return messages
  }
