import { Message } from '@/db';
import type { Message as MessageType, ObjectID } from '@uxc/types';
import type { Resolver } from '../types';

/**
 * @todo paginate
 * @todo deduplicate sender
 */
export const getMessages: Resolver<MessageType[], { threadId: ObjectID }> =
	async (_, { threadId }, context) => {
		const messages = await Message.find({ threadId }).populate('sender');

		return messages;
	};
