import { isTestRuntime } from '@/utils'

const LOOPBACK = '127.0.0.1'
const REDIS_PORT = 6379

export const options = {
  host: isTestRuntime ? LOOPBACK : process.env.REDIS_HOST || LOOPBACK,
  port: REDIS_PORT,
  ...(isTestRuntime ? {} : { password: process.env.REDIS_PASSWORD }),
  retryStrategy: (attempts: number) => Math.min(attempts * 50, 2000),
}
