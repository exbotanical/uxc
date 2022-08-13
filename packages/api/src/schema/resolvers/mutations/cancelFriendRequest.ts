import { ERROR_MESSAGES } from '@uxc/common/node'
import { AuthenticationError } from 'apollo-server-core'
import { isValidObjectId } from 'mongoose'

import { FriendRequest } from '@/db'
import { UserInputError } from '@/services/error'

import type { ObjectID, Context } from '@uxc/common/node'

interface CancelFriendRequestArgs {
  requestId?: ObjectID | null
}

export const cancelFriendRequest = async (
  _: Record<string, unknown>,
  { requestId }: CancelFriendRequestArgs,
  { req }: Context,
): Promise<ObjectID | null> => {
  const maybeRequester = req.session.meta?.id
  if (!maybeRequester) {
    throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION)
  }

  if (!requestId) {
    throw new UserInputError(ERROR_MESSAGES.E_NO_REQUEST_ID)
  }

  if (!isValidObjectId(requestId)) {
    throw new UserInputError(
      `The provided requestId ${requestId} is not a valid ObjectID.`,
    )
  }

  const requestExists = await FriendRequest.exists({ _id: requestId })

  if (!requestExists) {
    throw new UserInputError(
      `The provided requestId ${requestId} does not represent a resource in the database.`,
    )
  }

  const friendRequest = await FriendRequest.findOne({
    _id: requestId,
  })

  if (!friendRequest) {
    return null
  }

  const { requester } = friendRequest as { requester: ObjectID }

  if (maybeRequester.toString() !== requester.toString()) {
    throw new UserInputError(ERROR_MESSAGES.E_NO_OTHER_REQUEST_CANCEL)
  }

  friendRequest.deleteOne()

  return requester
}
