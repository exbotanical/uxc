import isEmail from 'isemail';

import {
	EMAIL_CHARS_MAX,
	EMAIL_CHARS_MIN,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN
} from '@uxc/types';

export function validateUsername(input: string) {
	const disallowedCharsRegex = /[ `!@#%^*()+=\[\]{};':"\\|,.<>\/?~]/;

	if (!input) {
		return 'A valid username is required.';
	}

	if (input.length < USERNAME_CHARS_MIN) {
		return `Your username must contain more than ${
			USERNAME_CHARS_MIN - 1
		} characters.`;
	}

	if (input.length > USERNAME_CHARS_MAX) {
		return `Your username must contain fewer than ${
			USERNAME_CHARS_MAX + 1
		} characters.`;
	}

	if (disallowedCharsRegex.test(input)) {
		return 'Your username contains a disallowed special character.';
	}

	return null;
}

export function validateEmail(input: string) {
	if (
		!input ||
		input.length < EMAIL_CHARS_MIN ||
		input.length > EMAIL_CHARS_MAX ||
		!isEmail.validate(input, { minDomainAtoms: 2 })
	) {
		return 'A valid email address is required.';
	}

	return null;
}

export function validatePassword(input: string) {
	if (!input) {
		return 'A valid password is required.';
	}

	if (input.length < PASSWORD_CHARS_MIN) {
		return `Your password must contain more than ${
			PASSWORD_CHARS_MIN - 1
		} characters.`;
	}

	if (input.length > PASSWORD_CHARS_MAX) {
		return `Your password must contain fewer than ${
			PASSWORD_CHARS_MAX + 1
		} characters.`;
	}

	return null;
}
