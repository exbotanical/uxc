import type { Channel, User, Message } from '@uxc/types';
import type { Connection } from './types';

type Handler<Data> = (data: Data) => void;

export type Wrapper = ReturnType<typeof wrap>;

// core api
export const wrap = (conn: Connection) => ({
	mutation: {
		createChannel: async (data: Pick<Channel, 'desc' | 'name'>) => {
			return conn.wait<{
				channel: Pick<Channel, 'desc' | 'name' | 'uuid'>;
			}>('create_channel', data);
		},
		sendMessage: (message: Message) => {
			conn.send('message', message);
		}
	},

	query: {
		getChannel: async ({ id }: { id: string }) => {
			return conn.wait<{ messages: Message[]; users: User[] }>('channel', {
				id
			});
		}
	},

	subscribe: {
		onMessage: (handler: Handler<Message>) => {
			return conn.subscribe('message', handler);
		}
	}
});
