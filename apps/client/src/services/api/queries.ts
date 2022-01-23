import { gql } from '@apollo/client';

export const GET_USER = gql`
	query getUser {
		userImage
		username
		uuid
		__typename
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			userImage
			username
			uuid
		}
	}
`;
