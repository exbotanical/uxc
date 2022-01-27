import { isInsecureMode } from '@/utils/runtime';
import { split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpHostname = isInsecureMode
	? import.meta.env.VITE_API_HTTP_HOSTNAME
	: import.meta.env.VITE_API_HTTPS_HOSTNAME;

const httpUri = `${httpHostname}/${import.meta.env.VITE_API_BASE_PATH}/${
	import.meta.env.VITE_API_GRAPHQL_PATH
}`;

const wsHostname = isInsecureMode
	? import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME
	: import.meta.env.VITE_API_SUBSCRIPTIONS_HOSTNAME_SECURE;

const wsUri = `${wsHostname}/${import.meta.env.VITE_API_SUBSCRIPTIONS_PATH}`;

const httpLink = new HttpLink({
	uri: httpUri
});

const wsLink = new WebSocketLink({
	uri: wsUri,
	options: {
		reconnect: true,
		connectionParams: {
			token: localStorage.getItem('token'),
			refreshToken: localStorage.getItem('refreshToken')
		}
	}
});

export const splitLink = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query) as {
			kind: string;
			operation: string;
		};
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink
);
