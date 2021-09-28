import type { IUser } from './user';

export interface IMessage {
	message: string;
	timestamp: Date;
	user: IUser;
}
