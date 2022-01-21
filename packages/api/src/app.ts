import { errorhandler } from './utils/error';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
// import 'express-async-errors';

/* Initialization */
const app = express();

app.use(json());

// trust nginx proxy
app.set('trust proxy', true);

app.use(
	cookieSession({
		secure: process.env.NODE_ENV !== 'test',
		signed: false,
		maxAge: 24 * 60 * 60 * 1000
	})
);

/* Routing */
app.get(`/health`, (_, res) => {
	res.send('live');
});

/* Global Middlewares */
app.use(errorhandler);

export { app };
