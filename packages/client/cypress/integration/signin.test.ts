import { ERROR_MESSAGES } from '@uxc/common';

import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import signinNotOk from '@/fixtures/signin/notok.json';
import signinOk from '@/fixtures/signin/ok.json';

const goodEmail = 'user@cypress.com';
const goodPassword = 'cypress_password';
const badEmail = 'user';

function signinUser() {
	cy.get('@email')
		.type(goodEmail)

		.get('@password')
		.type(goodPassword)

		.get('@btn')
		.click();
}

function setAliases() {
	cy.getByTestId('signin-button')
		.as('btn')
		.getByTestId('email-input')
		.as('email')
		.getByTestId('password-input')
		.as('password')
		.getByTestId('swapmode-button')
		.as('swap');
}

function init() {
	cy.visit('/signin');
	setAliases();
}

describe('signin workflow', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});
	});

	it('focuses the first input on load', () => {
		init();

		cy.focused().should('have.attr', 'data-testid', 'email-input');
	});

	it('tabs through all interactive elements', () => {
		init();

		const orderedInteractiveEls = [
			'email-input',
			'password-input',
			'forgot-pw-button',
			'signin-button',
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

	it('clicking on the swap mode button takes the user to the join page', () => {
		init();

		cy.get('@swap').click().url().should('eq', 'http://localhost:3000/join');
	});

	it('validates each input lazily, on unfocus', () => {
		init();

		cy.get('@email')
			.type(badEmail)
			.get('@email')
			.blur()
			.getByTestId('email-address-error')
			.should('contain', ERROR_MESSAGES.E_INVALID_EMAIL)

			.get('@password')
			.focus()
			.get('@password')
			.blur()
			.getByTestId('password-error')
			.should('contain', ERROR_MESSAGES.E_NO_PASSWORD);
	});

	it('displays an error if the provided credentials are invalid', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'signin', signinNotOk);
		init();

		cy.get('@email')
			.type('email@email.com')
			.get('@password')
			.focus()

			.get('@password')
			.type('wrong_pw')
			.get('@email')
			.focus()

			.get('@btn')
			.click()

			.getByTestId('error-message')
			.contains(ERROR_MESSAGES.E_INVALID_CREDENTIALS)

			.url()
			.should('eq', 'http://localhost:3000/signin');
	});

	it('redirects the user to the landing page once authenticated', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'signin', signinOk);
		init();

		signinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('redirects authenticated users to the landing page on load', () => {
		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		);
		init();

		cy.url().should('eq', 'http://localhost:3000/');
	});
});
