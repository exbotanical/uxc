import { SystemError } from '@/services/error'

export function validateConfig() {
  const requiredEnvVars = [
    'COOKIE_SECRET',
    'CLIENT_HTTPS_HOSTNAME',
    'CLIENT_HTTP_HOSTNAME',
    'REDIS_PASSWORD',
    'VITE_API_BASE_PATH',
    'VITE_API_SUBSCRIPTIONS_PATH',
    'VITE_API_GRAPHQL_PATH',
    'VITE_API_HTTP_HOSTNAME',
    'VITE_API_HTTPS_HOSTNAME',
    'VITE_API_SUBSCRIPTIONS_HOSTNAME',
    'VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE',
    'ACCESS_TOKEN_SIGNING_KEY',
    'REFRESH_TOKEN_SIGNING_KEY',
    'JWT_AUTHORITY',
    'DB_URL',
  ]
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar] == null) {
      throw new SystemError(`Environment variable ${envVar} not defined`)
    }
  }
}
