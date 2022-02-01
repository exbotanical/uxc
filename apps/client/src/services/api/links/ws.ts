import { isInsecureMode } from '@/utils/runtime';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsHostname = isInsecureMode
	? import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME
	: import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE;

const wsUri = `${wsHostname}/${import.meta.env.VITE_API_SUBSCRIPTIONS_PATH}`;

export const wsLink = new WebSocketLink({
	uri: wsUri,
	options: {
		reconnect: true,
		connectionParams: {
			token: localStorage.getItem('token'),
			refreshToken: localStorage.getItem('refreshToken')
		}
	}
});
