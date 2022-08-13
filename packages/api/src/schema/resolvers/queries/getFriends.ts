import { ERROR_MESSAGES } from '@uxc/common/node'
import { AuthenticationError } from 'apollo-server-core'

import { Friend } from '@/db'

import type { Resolver } from '../types'
import type { User } from '@uxc/common/node'

/**
 * @internal
 */
export const getFriends: Resolver<User[]> = async (_, __, { req }) => {
  const userId = req.session.meta?.id
  if (!userId) {
    throw new AuthenticationError(ERROR_MESSAGES.E_NO_USER_SESSION)
  }

  return Friend.findFriends(userId)
}
