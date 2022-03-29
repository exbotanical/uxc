import {
	USERNAME_CHARS_MAX,
	USERNAME_CHARS_MIN,
	ERROR_MESSAGES,
	PASSWORD_CHARS_MAX,
	PASSWORD_CHARS_MIN,
	EMAIL_CHARS_MAX
} from '@uxc/common';

import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import getThreadsEmptyOk from '@/fixtures/getThreads/ok.empty.json';
import joinInUse from '@/fixtures/join/in-use.json';
import joinOk from '@/fixtures/join/ok.json';

const goodUsername = 'cy_user';
const goodEmail = 'user@cypress.com';
const goodPassword = 'cypress_password';

function joinUser() {
	cy.get('@username')
		.type(goodUsername)
		.get('@email')
		.type(goodEmail)
		.get('@password')
		.type(goodPassword)
		.get('@btn')
		.click();
}

function setAliases() {
	cy.getByTestId('join-button')
		.as('btn')
		.getByTestId('username-input')
		.as('username')
		.getByTestId('email-input')
		.as('email')
		.getByTestId('password-input')
		.as('password')
		.getByTestId('swapmode-button')
		.as('swap');
}

function init() {
	cy.visit('/join');
	setAliases();
}

describe('join workflow', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});
	});

	it('focuses the first input on load', () => {
		init();

		cy.focused().should('have.attr', 'data-testid', 'username-input');
	});

	it('tabs through all interactive elements', () => {
		init();

		const orderedInteractiveEls = [
			'username-input',
			'email-input',
			'password-input',
			'join-button',
			'swapmode-button'
		];

		for (const el of orderedInteractiveEls.slice(1)) {
			cy.get('body')
				.realPress('Tab')
				.focused()
				.should('have.attr', 'data-testid', el);
		}

		for (const el of orderedInteractiveEls.reverse().slice(1)) {
			cy.realPress(['Shift', 'Tab'])
				.focused()
				.should('have.attr', 'data-testid', el);
		}
	});

	it('disables the join button if missing required fields', () => {
		init();

		cy.get('@btn')
			.should('have.attr', 'aria-disabled', 'true')

			.get('@username')
			.type(goodUsername)
			.get('@btn')
			.should('have.attr', 'aria-disabled', 'true')

			.get('@email')
			.type(goodEmail)
			.get('@btn')
			.should('have.attr', 'aria-disabled', 'true')

			.get('@password')
			.type(goodPassword)
			.get('@btn')
			.should('have.attr', 'aria-disabled', 'false')

			.get('@email')
			.clear()
			.get('@btn')
			.should('have.attr', 'aria-disabled', 'true')

			.get('@email')
			.type(goodEmail)
			.get('@btn')
			.should('have.attr', 'aria-disabled', 'false');
	});

	it('clicking on the swap mode button takes the user to the signin page', () => {
		init();

		cy.get('@swap').click().url().should('eq', 'http://localhost:3000/signin');
	});

	it('validates each input lazily, on unfocus', () => {
		init();

		cy.get('@username')
			.focus()
			.get('@username')
			.blur()
			.getByTestId('username-error')
			.should('contain', ERROR_MESSAGES.E_NO_USERNAME)

			.get('@email')
			.focus()
			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL)

			.get('@password')
			.focus()
			.get('@password')
			.blur()
			.getByTestId('password-error')
			.should('contain', ERROR_MESSAGES.E_NO_NEW_PASSWORD);
	});

	it('validates the provided username', () => {
		init();

		cy.get('@username')
			.type('x'.repeat(USERNAME_CHARS_MIN - 1))
			.get('@username')
			.blur()
			.getByTestId('username-error')
			.should('contain', ERROR_MESSAGES.E_SHORT_USERNAME)

			.get('@username')
			.clear()

			.get('@username')
			.type('x'.repeat(USERNAME_CHARS_MAX + 1))
			.get('@username')
			.blur()
			.getByTestId('username-error')
			.should('contain', ERROR_MESSAGES.E_LONG_USERNAME)

			.get('@username')
			.clear()

			.get('@username')
			.focus()
			.get('@username')
			.blur()
			.getByTestId('username-error')
			.should('contain', ERROR_MESSAGES.E_NO_USERNAME)

			.get('@username')
			.clear()

			.get('@username')
			.type(goodUsername)
			.get('@username')
			.blur()
			.getByTestId('username-error')
			.should('not.exist');
	});

	it('validates the provided email address', () => {
		init();

		cy.get('@email')
			.type('x@x.')
			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL)

			.get('@email')
			.clear()

			.get('@email')
			.type(`x@x.${'x'.repeat(EMAIL_CHARS_MAX + 1)}`)
			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL)

			.get('@email')
			.clear()
			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL)

			.get('@email')
			.clear()
			.get('@email')
			.type('xxx@xxx')

			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL);
	});

	it('validates the provided password', () => {
		init();

		cy.get('@password')
			.focus()
			.get('@password')
			.blur()
			.getByTestId('password-error')
			.should('contain', ERROR_MESSAGES.E_NO_NEW_PASSWORD)

			.get('@password')
			.clear()

			.get('@password')
			.type('x'.repeat(PASSWORD_CHARS_MIN - 1))
			.get('@password')
			.blur()
			.getByTestId('password-error')
			.should('contain', ERROR_MESSAGES.E_SHORT_PASSWORD)

			.get('@password')
			.clear()

			.get('@password')
			.type('x'.repeat(PASSWORD_CHARS_MAX + 1))
			.get('@password')
			.blur()
			.getByTestId('password-error')
			.should('contain', ERROR_MESSAGES.E_LONG_PASSWORD);
	});

	it('displays an error if the email address or username is taken', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'join', joinInUse);
		init();
		joinUser();

		cy.getByTestId('error-message').contains(
			ERROR_MESSAGES.E_CREDENTIALS_TAKEN_FRIENDLY
		);

		cy.url().should('eq', 'http://localhost:3000/join');
	});

	it('redirects the new user to the landing page once submitting', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'join', joinOk);

		init();
		joinUser();

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		)

			.interceptGQL(
				'http://localhost/api/graphql',
				'getThreads',
				getThreadsEmptyOk
			)

			.url()
			.should('eq', 'http://localhost:3000/');
	});

	it('redirects authenticated users to the landing page on load', () => {
		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		);

		init();

		cy.url().should('eq', 'http://localhost:3000/thread');
	});
});
