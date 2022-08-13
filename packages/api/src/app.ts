import { json } from 'body-parser'
import express from 'express'
import 'express-async-errors'

import { sessionMiddleware as session } from './middleware'
import { refreshMiddleware } from './middleware/refresh'

export const app = express()
  .set('trust proxy', 1)
  .use(json())
  .use(session)
  .use(refreshMiddleware)
  .get(`/health`, (_, res) => {
    res.send('live')
  })
