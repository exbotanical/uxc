import {
	EMAIL_CHARS_MAX,
	EMAIL_CHARS_MIN,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN
} from '@uxc/common';

export function validateUsername(input: string) {
	// @todo impl on backend
	const disallowedCharsRegex = /[ `!@#%^*()+=\[\]{};':"\\|,.<>\/?~]/;

	if (!input) {
		return ERROR_MESSAGES.E_NO_USERNAME;
	}

	if (input.length < USERNAME_CHARS_MIN) {
		return ERROR_MESSAGES.E_SHORT_USERNAME;
	}

	if (input.length > USERNAME_CHARS_MAX) {
		return ERROR_MESSAGES.E_LONG_USERNAME;
	}

	if (disallowedCharsRegex.test(input)) {
		return ERROR_MESSAGES.E_DISALLOWED_CHAR_USERNAME;
	}

	return null;
}

export function validateEmail(input: string) {
	const emailRegex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line no-control-regex
	if (
		!input ||
		input.length < EMAIL_CHARS_MIN ||
		input.length > EMAIL_CHARS_MAX ||
		!emailRegex.test(input)
	) {
		return ERROR_MESSAGES.E_INVALID_EMAIL;
	}

	return null;
}

export function validatePassword(input: string) {
	if (!input) {
		return ERROR_MESSAGES.E_NO_NEW_PASSWORD;
	}

	if (input.length < PASSWORD_CHARS_MIN) {
		return ERROR_MESSAGES.E_SHORT_PASSWORD;
	}

	if (input.length > PASSWORD_CHARS_MAX) {
		return ERROR_MESSAGES.E_LONG_PASSWORD;
	}

	return null;
}

export function validateSigninPassword(input: string) {
	if (!input) {
		return ERROR_MESSAGES.E_NO_PASSWORD;
	}

	return null;
}
