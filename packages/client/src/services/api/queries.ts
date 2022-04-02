import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			_id
			username
			email
			userImage
		}
	}
`;

export const SIGNIN = gql`
	mutation ($args: SigninInput) {
		signin(args: $args) {
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

export const ON_THREAD_MESSAGE_CREATED = gql`
	subscription onThreadMessageCreated($threadId: ID) {
		onThreadMessageCreated(threadId: $threadId) {
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

export const ON_ANY_MESSAGE_CREATED = gql`
	subscription onAnyMessageCreated {
		onAnyMessageCreated {
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

export const UPDATE_MESSAGE = gql`
	mutation ($messageId: ID, $body: String) {
		updateMessage(body: $body, messageId: $messageId) {
			_id
			threadId
			body
			createdAt
			updatedAt
		}
	}
`;

export const TEXT_SEARCH = gql`
	query search($query: String) {
		search(query: $query) {
			... on PrivateThread {
				__typename
				_id
				users {
					_id
					username
					userImage
					email
				}
			}

			... on MessageResult {
				__typename
				_id
				body
				threadId {
					_id
				}
				sender {
					_id
					email
					userImage
					username
				}
			}
		}
	}
`;

export const FRIEND_SEARCH = gql`
	query searchFriends($query: String, $type: FriendRequestOptions) {
		searchFriends(query: $query, type: $type) {
			friends {
				_id
				email
				username
				userImage
			}

			sent {
				_id
				email
				username
				userImage
				requestId
			}

			received {
				_id
				email
				username
				userImage
				requestId
			}
		}
	}
`;

export const REMOVE_FRIEND = gql`
	mutation ($friendId: ID) {
		removeFriend(friendId: $friendId)
	}
`;

export const UPDATE_FRIEND_REQUEST = gql`
	mutation ($requestId: ID, $status: FriendRequestStatus) {
		updateFriendRequest(requestId: $requestId, status: $status)
	}
`;

export const CANCEL_FRIEND_REQUEST = gql`
	mutation ($requestId: ID) {
		cancelFriendRequest(requestId: $requestId)
	}
`;
