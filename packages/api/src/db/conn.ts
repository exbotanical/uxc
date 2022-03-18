import mongoose from 'mongoose';

export async function connectToDatabase() {
	// return mongoose.connect(process.env.DB_URL!);
	return mongoose.connect('mongodb://root:rootpassword@database:27017');
}
