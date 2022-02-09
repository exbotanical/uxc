import { User } from '@/db';
import type { ObjectID, User as UserType } from '@uxc/types';
import type { Resolver } from '../types';

export const getUser: Resolver<UserType, { userId: ObjectID }> = async (
	_,
	{ userId },
	{ req }
) => {
	const user = await User.findById(userId);

	return user;
};
