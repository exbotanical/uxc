import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import redisMock from 'redis-mock'

import { SessionMiddleware } from '@/middleware'
import { logger } from '@/services/logger'
import { isTestRuntime } from '@/utils'

import { options } from '.'

const instance = isTestRuntime ? redisMock.createClient() : new Redis(options)

export const client = instance
  .on('error', ex => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    logger.error('redis store error', { ex })
  })
  .on('connect', () => {
    logger.info('redis store connect')
  })

export function buildStore(session: SessionMiddleware) {
  return new (connectRedis(session))({
    client,
    ttl: 86400,
  })
}
