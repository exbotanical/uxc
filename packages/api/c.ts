// import { schema } from './schema';
// import express from 'express';
// import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { createServer } from 'http';
// import { ApolloServer } from 'apollo-server-express';

// const PORT = 5000;

// // minimal version of `import { useServer } from 'graphql-ws/lib/use/ws';`

// import { WebSocketServer } from 'ws'; // yarn add ws
// // import ws from 'ws'; yarn add ws@7
// // const WebSocketServer = ws.Server;
// import { makeServer, CloseCode } from 'graphql-ws';

// // make
// const server = makeServer({ schema });

// // create websocket server
// const wsServer = new WebSocketServer({
// 	port: PORT,
// 	path: '/graphql'
// });

// // implement
// wsServer.on('connection', (socket, request) => {
// 	// a new socket opened, let graphql-ws take over
// 	const closed = server.opened(
// 		{
// 			protocol: socket.protocol, // will be validated
// 			send: (data) =>
// 				new Promise((resolve, reject) => {
// 					socket.send(data, (err) => (err ? reject(err) : resolve()));
// 				}), // control your data flow by timing the promise resolve
// 			close: (code, reason) => socket.close(code, reason), // there are protocol standard closures
// 			onMessage: (cb) =>
// 				socket.on('message', async (event) => {
// 					try {
// 						// wait for the the operation to complete
// 						// - if init message, waits for connect
// 						// - if query/mutation, waits for result
// 						// - if subscription, waits for complete
// 						await cb(event.toString());
// 					} catch (err) {
// 						// all errors that could be thrown during the
// 						// execution of operations will be caught here
// 						socket.close(CloseCode.InternalServerError, err.message);
// 					}
// 				})
// 		},
// 		// pass values to the `extra` field in the context
// 		{ socket, request }
// 	);

// 	// notify server that the socket closed
// 	socket.once('close', (code, reason) =>
// 		closed(code, reason as unknown as string)
// 	);
// });
