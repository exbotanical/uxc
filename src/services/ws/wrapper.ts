import type { Connection } from './core';
import type { Message } from '@/types/message';

import { Channel } from '@/types/channel';
import { User } from '@/types/user';

type Handler<Data> = (data: Data) => void;

export type Wrapper = ReturnType<typeof wrap>;

// core api
export const wrap = (conn: Connection) => ({
	mutation: {
		createChannel: async (data: Pick<Channel, 'desc' | 'name'>) => {
			return conn.wait('create_channel', data) as Promise<
				| {
						channel: Pick<Channel, 'desc' | 'name' | 'uuid'>;
				  }
				| {
						error: string;
				  }
			>;
		},
		sendMessage: (message: Message) => {
			conn.send('message', message);
		}
	},

	query: {
		getChannel: async ({ id }: { id: string }) => {
			return conn.wait('channel', {
				id
			}) as Promise<
				| {
						error: string;
				  }
				| {
						messages: Message[];
						users: User[];
				  } // TODO return types file
			>;
		}
	},

	subscribe: {
		onMessage: (handler: Handler<Message>) => {
			return conn.subscribe('message', handler);
		}
	}
});
