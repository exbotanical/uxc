import { Message } from '@/db';
import type { Message as MessageType, ObjectID } from '@uxc/types';
import type { Resolver } from '../types';

export const getMessages: Resolver<MessageType[], { threadId: ObjectID }> =
	async (_, { threadId }, context) => {
		/**  @todo paginate */
		/**  @todo deduplicate sender */
		const messages = await Message.find({ threadId }).populate('sender');

		return messages;
	};
