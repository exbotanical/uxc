import mongoose from 'mongoose';

export async function purge() {
	const collections = await mongoose.connection.db.collections();
	const tasks = collections.map(async (collection) => collection.deleteMany({}));

	await Promise.all(tasks);

	return true;
}
