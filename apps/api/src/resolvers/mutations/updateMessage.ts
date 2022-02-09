import { Message } from '@/db';
import type { ObjectID } from '@uxc/types';
import type { Resolver } from '../types';

export const updateMessage: Resolver<
	ObjectID | null,
	{ messageId: ObjectID; body: string }
> = async (_, { messageId, body }) => {
	const message = await Message.findOneAndUpdate({ _id: messageId }, { body });

	return message?._id ?? null;
};
