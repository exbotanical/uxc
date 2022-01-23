import { isInsecureModeRuntime } from '@/utils/runtime';
import { split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

console.log(window.location.hostname);
const httpHostname = import.meta.env[
	(isInsecureModeRuntime
		? 'API_HTTP_HOSTNAME'
		: 'API_HTTPS_HOSTNAME') as keyof ImportMeta['env']
];

const httpUri = `${httpHostname}/${import.meta.env.API_BASE_PATH}/${
	import.meta.env.API_GRAPHQL_PATH
}`;

const wsHostname = import.meta.env[
	(isInsecureModeRuntime
		? 'API_SUBSCRIPTIONS_HOSTNAME'
		: 'API_SUBSCRIPTIONS_HOSTNAME_SECURE') as keyof ImportMeta['env']
];

const wsUri = `${wsHostname}/${import.meta.env.API_SUBSCRIPTIONS_PATH}`;

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
