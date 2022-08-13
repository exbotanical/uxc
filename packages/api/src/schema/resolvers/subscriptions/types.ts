import type { ObjectID, MessageWithSender } from '@uxc/common/node'

export interface SocketContext {
  id: ObjectID
}

export interface WithMessage {
  message: MessageWithSender
}
