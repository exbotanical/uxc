import { gql } from '@apollo/client';

export const GET_USER = gql`
	query getUser {
		getUser {
			_id
			username
			email
			userImage
			currentRoomId
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
			currentRoomId
		}
	}
`;

export const JOIN = gql`
	mutation ($args: JoinInput) {
		join(args: $args) {
			_id
			currentRoomId
			email
			userImage
			username
		}
	}
`;

export const GET_DIRECTS = gql`
	query getDirects($userId: ID) {
		getDirects(userId: $userId) {
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
	query getMessages($roomId: ID) {
		getMessages(roomId: $roomId) {
			_id
			body
			createdAt
			sender {
				_id
				username
				email
				userImage
				currentRoomId
			}
			updatedAt
		}
	}
`;
