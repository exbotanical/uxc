export const ERROR_MESSAGES = {
	E_NO_CREDENTIALS: 'Credentials must be provided',
	E_NO_EMAIL: 'An email address must be provided',
	E_NO_PASSWORD: 'A password must be provided',
	E_NO_USERNAME: 'A username must be provided',
	E_INVALID_CREDENTIALS: 'The provided credentials are invalid',
	E_INVALID_EMAIL: 'A valid email address must be provided',
	E_SHORT_PASSWORD: 'Password length must be greater than 6 characters',
	E_LONG_PASSWORD: 'Password length must be less than 21 characters',
	E_SHORT_USERNAME: 'Username length must be greater than 4 characters',
	E_LONG_USERNAME: 'Username length must be less than 21 characters',
	E_CREDENTIALS_TAKEN: 'Email or username in use',
	E_INVALID_PROGRAMMATIC_INPUTS:
		'An input exception has occurred, and it appears to be a bug. Please notify the administrator.',
	E_AUTHORIZATION_REQUIRED: 'Authorization is required',
	E_NO_USER_SESSION: 'User session no longer extant',
	E_NO_THREAD_ID: 'threadId is required but was not supplied',
	E_EMAIL_IN_USE: 'Email or username in use'
};

export const EVENTS = {
	MESSAGE_CREATED: 'MESSAGE_CREATED'
};
