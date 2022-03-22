export const SIGNIN_MUTATION = `
	mutation($args: SigninInput) {
		signin(args: $args) {
			_id
			email
			username
			userImage
		}
	}
`;

export const SIGNOUT_MUTATION = `
	mutation {
		signout
	}
`;

export const JOIN_MUTATION = `
	mutation($args: JoinInput) {
		join(args: $args) {
			_id
			email
			username
			userImage
		}
	}
`;

export const GET_CURRENT_USER = `
	query {
		getCurrentUser {
			_id
			username
			email
			userImage
		}
	}
`;

export const GET_USER = `
	query getUser($userId: ID) {
		getUser(userId: $userId) {
			_id
			username
			email
			userImage
		}
	}
`;

export const CREATE_MESSAGE = `
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

export const UPDATE_MESSAGE = `
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

export const CREATE_THREAD = `
	mutation ($receiverId: ID) {
		createThread(receiverId: $receiverId) {
			_id
			users {
				_id
			}
		}
	}
`;

export const DELETE_THREAD = `
	mutation ($threadId: ID) {
		deleteThread(threadId: $threadId)
	}
`;

export const GET_THREAD = `
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

export const CREATE_FRIEND_REQUEST = `
	mutation ($recipientId: ID) {
		createFriendRequest(recipientId: $recipientId)
	}
`;

export const UPDATE_FRIEND_REQUEST = `
	mutation ($requestId: ID, $status: FriendRequestStatus) {
		updateFriendRequest(requestId: $requestId, status: $status)
	}
`;

export const GET_FRIEND_REQUESTS_SENT = `
	query getFriendRequests($type: FriendRequestType) {
		getFriendRequests(type: $type) {

			...on SentFriendRequest {
				_id
				requester
				recipient {
					_id
					username
					email
					userImage
				}
				status
			}
		}
	}
`;

export const GET_FRIEND_REQUESTS_RECV = `
	query getFriendRequests($type: FriendRequestType) {
		getFriendRequests(type: $type) {
			__typename

			...on ReceivedFriendRequest {
				_id
				requester {
					_id
					username
					email
					userImage
				}
				recipient
				status
			}
		}
	}
`;

export const GET_FRIENDS = `
	query {
		getFriends {
			_id
			friendNodeX {
				_id
			}
			friendNodeY {
				_id
			}
		}
	}
`;

export const REMOVE_FRIEND = `
	mutation ($friendId: ID) {
		removeFriend(friendId: $friendId)
	}
`;

export const TEXT_SEARCH = `
	query search($query: String) {
		search(query: $query) {
			... on PrivateThread {
				_id
				users {
					_id
					username
					userImage
					email
				}
			}

			... on MessageResult {
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
