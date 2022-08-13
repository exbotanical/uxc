import type { MessageWithSender, User } from '@uxc/common'

export function filterMessagesToSender(
  messages?: MessageWithSender[],
  currentUser?: User,
) {
  let userId: string | null = null

  const filteredMessages =
    messages?.map(message => {
      /**
       * Is this message mine?
       */
      let isSender = false
      /**
       * Skip metadata (e.g. username, avatar) in display?
       */
      let sansMeta = false

      if (userId === message.sender._id) {
        sansMeta = true
      }

      if (message.sender._id === currentUser?._id) {
        isSender = true
      } else {
        isSender = false
      }

      userId = message.sender._id

      return {
        ...message,
        isSender,
        sansMeta,
      }
    }) || []

  return filteredMessages
}
