import { gql } from '@apollo/client';

export const GET_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			_id
			username
			email
			userImage
		}
	}
`;

export const LOGIN = gql`
	mutation ($args: LoginInput) {
		login(args: $args) {
			_id
			email
			username
			userImage
		}
	}
`;

export const JOIN = gql`
	mutation ($args: JoinInput) {
		join(args: $args) {
			_id
			email
			userImage
			username
		}
	}
`;

export const GET_THREADS = gql`
	query getThreads($userId: ID) {
		getThreads(userId: $userId) {
			_id
			createdAt
			updatedAt
			users {
				_id
				username
				userImage
				email
			}
		}
	}
`;

export const GET_MESSAGES = gql`
	query getMessages($threadId: ID) {
		getMessages(threadId: $threadId) {
			_id
			body
			createdAt
			sender {
				_id
				username
				email
				userImage
			}
			updatedAt
		}
	}
`;
