import { isInsecureMode } from '@/utils/runtime';
import { split, HttpLink, from } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';

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

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Net    work error]: ${networkError}`);
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

export const link = from([errorLink, splitLink]);
