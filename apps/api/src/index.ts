import 'module-alias/register';
import { connectToDatabase } from './db';
import { DatabaseConnectionError } from './middleware';
import { initializeServer } from './server';
import { validateConfig } from './utils';

const PORT = process.env.API_PORT || 5000;

(async () => {
	validateConfig();
	const { httpServer, server } = await initializeServer();

	try {
		await connectToDatabase();
	} catch (ex) {
		throw new DatabaseConnectionError(
			`failed to initialize database connection; see: ${ex}`
		);
	}

	httpServer.listen(PORT, () => {
		console.info(
			`\n🚀 Query endpoint listening at http://localhost:${PORT}${server.graphqlPath}`
		);

		console.info(
			`🚀 Subscription endpoint listening at ws://localhost:${PORT}${server.graphqlPath}`
		);

		console.info(
			`🚀 GraphQL Explorer listening at http://localhost:${PORT}${server.graphqlPath}\n`
		);
	});
})();

process.on('unhandledRejection', (reason) => {
	console.log('Unhandled', { reason });
	// throw reason;
});
