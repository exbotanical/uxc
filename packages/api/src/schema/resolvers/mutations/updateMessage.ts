import { ERROR_MESSAGES } from '@uxc/common/node'
import { isValidObjectId } from 'mongoose'

import { Message } from '@/db'
import { UserInputError } from '@/services/error'

import type { Resolver } from '../types'
import type { ObjectID, Message as MessageType } from '@uxc/common/node'

// @todo disallow users to edit any message; restrict to sender/receiver; test
export const updateMessage: Resolver<
  MessageType | null,
  { messageId: ObjectID; body: string }
> = async (_, { messageId, body }) => {
  if (!messageId) {
    throw new UserInputError(ERROR_MESSAGES.E_NO_MESSAGE_ID)
  }

  if (!isValidObjectId(messageId)) {
    throw new UserInputError(
      `The provided messageId ${messageId} is not a valid ObjectID.`,
    )
  }

  const messageExists = await Message.exists({ _id: messageId })

  if (!messageExists) {
    throw new UserInputError(
      `The provided messageId ${messageId} does not represent a resource in the database.`,
    )
  }

  const message = await Message.findOneAndUpdate({ _id: messageId }, { body })

  return message
}
