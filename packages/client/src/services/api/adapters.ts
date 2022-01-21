import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
	uri: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:5000/subscriptions',
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
