import { WebSocketLink } from '@apollo/client/link/ws'

import { isTestRuntime } from '@/utils/runtime'

const wsHostname = isTestRuntime
  ? import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME
  : import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE

const wsUri = `${wsHostname}/${import.meta.env.VITE_API_SUBSCRIPTIONS_PATH}`

export const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
  },
})
