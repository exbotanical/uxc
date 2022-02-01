import { isInsecureMode } from '@/utils/runtime';
import { HttpLink } from '@apollo/client';

const httpHostname = isInsecureMode
	? import.meta.env.VITE_API_HTTP_HOSTNAME
	: import.meta.env.VITE_API_HTTPS_HOSTNAME;

const httpUri = `${httpHostname}/${import.meta.env.VITE_API_BASE_PATH}/${
	import.meta.env.VITE_API_GRAPHQL_PATH
}`;

export const httpLink = new HttpLink({
	uri: httpUri
});
