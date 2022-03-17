// inclusive min / max
export const USERNAME_CHARS_MIN = 4;
export const USERNAME_CHARS_MAX = 21;
export const EMAIL_CHARS_MIN = 5;
export const EMAIL_CHARS_MAX = 64;
export const PASSWORD_CHARS_MIN = 8;
export const PASSWORD_CHARS_MAX = 64;

export const ERROR_MESSAGES = {
	E_AUTHORIZATION_REQUIRED: 'Authorization is required.',
	E_CREDENTIALS_TAKEN: 'Email or username in use.',
	E_CREDENTIALS_TAKEN_FRIENDLY: 'The email or username you chose is taken.',
	E_DISALLOWED_CHAR_USERNAME:
		'Your username contains a disallowed special character.',
	E_INVALID_CREDENTIALS: 'The provided credentials are invalid.',
	E_INVALID_EMAIL: 'A valid email address is required.',
	E_INVALID_PROGRAMMATIC_INPUTS:
		'An input exception has occurred, and it appears to be a bug. Please notify the administrator..',
	E_LONG_PASSWORD: `Your password must contain fewer than ${
		PASSWORD_CHARS_MAX + 1
	} characters.`,
	E_LONG_USERNAME: `Your username must contain fewer than ${
		USERNAME_CHARS_MAX + 1
	} characters.`,
	E_NO_CREDENTIALS: 'Credentials must be provided.',
	E_NO_ARGS: 'Arguments must be provided.',
	E_NO_MESSAGE_ID: 'messageId is required but was not supplied.',
	E_NO_NEW_PASSWORD: 'A valid password is required.',
	E_NO_PASSWORD: 'A password must be provided.',
	E_NO_RECEIVER_ID: 'receiverId is required but was not supplied.',
	E_NO_THREAD_ID: 'threadId is required but was not supplied.',
	E_NO_USERNAME: 'A valid username is required.',
	E_NO_USER_ID: 'userId is required but was not supplied.',
	E_NO_USER_SESSION: 'User session no longer extant.',
	E_SHORT_PASSWORD: `Your password must contain more than ${
		PASSWORD_CHARS_MIN - 1
	} characters.`,
	E_SHORT_USERNAME: `Your username must contain more than ${
		USERNAME_CHARS_MIN - 1
	} characters.`,
	E_NO_RECIPIENTID: 'The required argument `recipientId` was not provided.',
	E_NO_RECIPIENT: 'A recipientId is required.',
	E_NO_REQUESTID: 'A requestId is required.',
	E_NO_REQUEST_STATUS:
		'A status is required in order to update a friend request.',
	E_NO_SELF_REQUEST: 'You cannot send a friend request to yourself.',
	E_NO_SELF_REQUEST_EDIT: "You cannot edit another user's friend request.",
	E_NO_FRIEND_ID: "friendId is required but was not supplied.',",
	E_GENERIC_FRIENDLY:
		'Something went wrong. Please try again or contact support.'
};
