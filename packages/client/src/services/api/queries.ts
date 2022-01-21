import { gql } from '@apollo/client';

export const GET_USER = gql`
	query getUser {
		userImage
		username
		uuid
		__typename
	}
`;
