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

export const GET_THREAD = gql`
	query getThread($threadId: ID) {
		getThread(threadId: $threadId) {
			_id
			createdAt
			updatedAt
			users {
				_id
				username
				email
				userImage
			}
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
			updatedAt
			sender {
				_id
				username
				email
				userImage
			}
		}
	}
`;

export const MESSAGES_SUBSCRIPTION = gql`
	subscription onMessage($threadId: ID) {
		onMessage(threadId: $threadId) {
			_id
			body
			createdAt
			updatedAt
			threadId
			sender {
				_id
				email
				userImage
				username
			}
		}
	}
`;

export const CREATE_MESSAGE = gql`
	mutation ($threadId: ID, $body: String) {
		createMessage(body: $body, threadId: $threadId) {
			_id
			threadId
			body
			createdAt
			updatedAt
		}
	}
`;
