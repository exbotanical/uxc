import { IChannel } from '@/types/channel';

import type { IConnection } from './core';
import type { IMessage } from '@/types/message';
import { IUser } from '@/types/user';

type Handler<Data> = (data: Data) => void;

export type Wrapper = ReturnType<typeof wrap>;

// helpers
const isMutationError = (ret: any): ret is Partial<{ error: string }> => {
	return !!ret?.error;
};

// core api
export const wrap = (conn: IConnection) => ({
	subscribe: {
		onMessage: (handler: Handler<IMessage>) => {
			return conn.subscribe('message', handler);
		}
	},

	query: {
		getChannel: ({ id }: { id: string }) => {
			return conn.wait('channel', { id }) as Promise<
				{ error: string } | { messages: IMessage[]; users: IUser[] } // TODO return types file
			>;
		}
	},

	mutation: {
		sendMessage: (message: Omit<IMessage, 'uuid'>) => {
			return conn.send('message', message);
		},

		createChannel: (data: Pick<IChannel, 'name' | 'desc'>) => {
			return conn.wait('create_channel', data) as Promise<
				| { error: string }
				| { channel: Pick<IChannel, 'name' | 'desc' | 'uuid'> }
			>;
		}
	}
});
