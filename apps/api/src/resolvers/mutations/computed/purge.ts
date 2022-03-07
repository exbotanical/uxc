import mongoose from 'mongoose';

import type { Context } from '@uxc/types/node';

export async function purge(_: any, __: any, { req }: Context) {
	const collections = await mongoose.connection.db.collections();

	console.log(collections);
	for (let collection of collections) {
		await collection.deleteMany({});
	}

	return true;
}
