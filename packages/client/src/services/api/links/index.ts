import { split, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { errorLink } from './error';
import { httpLink } from './http';
import { wsLink } from './ws';

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
