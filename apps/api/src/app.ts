import { json } from 'body-parser';
import express from 'express';

import { sessionMiddleware as session } from './middleware';

import 'express-async-errors';

const app = express()
	.set('trust proxy', true)
	.use(json())
	.use(session)
	.get(`/health`, (_, res) => {
		res.send('live');
	});

export { app };
