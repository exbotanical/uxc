import {
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	EMAIL_CHARS_MAX,
	EMAIL_CHARS_MIN
} from '@uxc/types';

import { aliasQuery } from '../utils';

describe('join workflow', () => {
	const goodUsername = 'cypress_user';
	const goodEmail = 'cypress@cypress.com';
	const goodPassword = 'cypress_password';

	const badUsername = 'cy';
	const badEmail = 'cy';
	const badPassword = 'cy';

	function joinUser() {
		cy.get('@username').type(goodUsername);
		cy.get('@email').type(goodEmail);
		cy.get('@password').type(goodPassword);
		cy.get('@btn').click();
	}

	beforeEach(() => {
		cy.intercept('POST', 'http://localhost:3000/api/graphql', (req) => {
			aliasQuery(req, 'join');
			aliasQuery(req, 'getCurrentUser');
		});

		cy.visit('/join');

		cy.getByTestId('join-button').as('btn');
		cy.getByTestId('username-input').as('username');
		cy.getByTestId('email-input').as('email');
		cy.getByTestId('password-input').as('password');
		cy.getByTestId('swapmode-button').as('swap');
	});

	it.skip('focuses the first input on load', () => {
		cy.focused().should('have.attr', 'data-testid', 'username-input');
	});

	it.skip('tabs through all interactive elements', () => {
		const orderedInteractiveEls = [
			'username-input',
			'email-input',
			'password-input',
			'join-button',
			'swapmode-button'
		];

		for (const el of orderedInteractiveEls.slice(1)) {
			cy.get('body').realPress('Tab');
			cy.focused().should('have.attr', 'data-testid', el);
		}

		for (const el of orderedInteractiveEls.reverse().slice(1)) {
			cy.realPress(['Shift', 'Tab']);
			cy.focused().should('have.attr', 'data-testid', el);
		}
	});

	it.skip('disables the join button if missing required fields', () => {
		cy.get('@btn').should('have.attr', 'aria-disabled');

		cy.get('@username').type(goodUsername);
		cy.get('@btn').should('have.attr', 'aria-disabled', 'true');

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('have.attr', 'aria-disabled', 'true');

		cy.get('@password').type(goodPassword);
		cy.get('@btn').should('have.attr', 'aria-disabled', 'false');

		cy.get('@email').clear();
		cy.get('@btn').should('have.attr', 'aria-disabled', 'true');

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('have.attr', 'aria-disabled', 'false');
	});

	it.skip('clicking on the swap mode button takes the user to the signin page', () => {
		cy.get('@swap').click();
		cy.url().should('eq', 'http://localhost:3000/signin');
	});

	it.skip('validates each input lazily, on unfocus', () => {
		cy.get('@username').focus();
		cy.get('@username').blur();
		cy.getByTestId('username-error').should(
			'contain',
			ERROR_MESSAGES.E_NO_USERNAME
		);

		cy.get('@email').focus();
		cy.get('@email').blur();
		cy.getByTestId('email-address-error').should(
			'contain',
			ERROR_MESSAGES.E_INVALID_EMAIL
		);

		cy.get('@password').focus();
		cy.get('@password').blur();
		cy.getByTestId('password-error').should(
			'contain',
			ERROR_MESSAGES.E_NO_NEW_PASSWORD
		);
	});

	it.skip('validates the provided username', () => {
		cy.get('@username').type('x'.repeat(USERNAME_CHARS_MIN - 1));
		cy.get('@username').blur();
		cy.getByTestId('username-error').should(
			'contain',
			ERROR_MESSAGES.E_SHORT_USERNAME
		);

		cy.get('@username').clear();

		cy.get('@username').type('x'.repeat(USERNAME_CHARS_MAX + 1));
		cy.get('@username').blur();
		cy.getByTestId('username-error').should(
			'contain',
			ERROR_MESSAGES.E_LONG_USERNAME
		);

		cy.get('@username').clear();

		cy.get('@username').focus();
		cy.get('@username').blur();
		cy.getByTestId('username-error').should(
			'contain',
			ERROR_MESSAGES.E_NO_USERNAME
		);

		cy.get('@username').clear();

		cy.get('@username').type(goodUsername);
		cy.get('@username').blur();
		cy.getByTestId('username-error').should('not.exist');
	});

	it.skip('validates the provided email address', () => {
		cy.get('@email').type('x@x.');
		cy.get('@email').blur();
		cy.getByTestId('email-address-error').should(
			'contain',
			ERROR_MESSAGES.E_INVALID_EMAIL
		);

		cy.get('@email').clear();

		cy.get('@email').type(`x@x.${  'x'.repeat(EMAIL_CHARS_MAX + 1)}`);
		cy.get('@email').blur();
		cy.getByTestId('email-address-error').should(
			'contain',
			ERROR_MESSAGES.E_INVALID_EMAIL
		);

		cy.get('@email').clear();
		cy.get('@email').blur();
		cy.getByTestId('email-address-error').should(
			'contain',
			ERROR_MESSAGES.E_INVALID_EMAIL
		);

		cy.get('@email').clear();
		cy.get('@email').type('xxx@xxx');

		cy.get('@email').blur();
		cy.getByTestId('email-address-error').should(
			'contain',
			ERROR_MESSAGES.E_INVALID_EMAIL
		);
	});

	it.skip('validates the provided password', () => {
		cy.get('@password').focus();
		cy.get('@password').blur();
		cy.getByTestId('password-error').should(
			'contain',
			ERROR_MESSAGES.E_NO_NEW_PASSWORD
		);

		cy.get('@password').clear();

		cy.get('@password').type('x'.repeat(PASSWORD_CHARS_MIN - 1));
		cy.get('@password').blur();
		cy.getByTestId('password-error').should(
			'contain',
			ERROR_MESSAGES.E_SHORT_PASSWORD
		);

		cy.get('@password').clear();

		cy.get('@password').type('x'.repeat(PASSWORD_CHARS_MAX + 1));
		cy.get('@password').blur();
		cy.getByTestId('password-error').should(
			'contain',
			ERROR_MESSAGES.E_LONG_PASSWORD
		);
	});

	it.skip('displays an error if the email address is taken', () => {
		joinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it.skip('displays an error if the username is taken', () => {
		joinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it.skip('redirects the new user to the landing page once submitting', () => {
		joinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it.skip('redirects authenticated users to the landing page on load', () => {
		cy.url().should('eq', 'http://localhost:3000/');
	});
});
