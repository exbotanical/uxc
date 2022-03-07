import { aliasQuery } from '../utils';

describe('signin workflow', () => {
	const goodEmail = 'cypress@cypress.com';
	const goodPassword = 'cypress_1password';

	const badEmail = 'cy';
	const badPassword = 'cy';

	function signinUser() {
		cy.get('@email').type(goodEmail);
		cy.get('@password').type(goodPassword);
		cy.get('@btn').click();
	}

	beforeEach(() => {
		cy.intercept('POST', 'http://localhost:3000/api/graphql', (req) => {
			aliasQuery(req, 'signin');
			aliasQuery(req, 'getCurrentUser');
		});

		cy.visit('/signin');

		cy.getByTestId('signin-button').as('btn');
		cy.getByTestId('email-input').as('email');
		cy.getByTestId('password-input').as('password');
		cy.getByTestId('swapmode-button').as('swap');
	});

	it('focuses the first input on load', () => {
		cy.focused().should('have.attr', 'data-testid', 'email-input');
	});

	it('tabs through all interactive elements', () => {
		const orderedInteractiveEls = [
			'email-input',
			'password-input',
			'signin-button',
			'swapmode-button'
		];

		for (const el of orderedInteractiveEls.slice(1)) {
			cy.get('body').realPress('Tab');
			cy.focused().should('have.attr', 'data-testid', el);
		}

		for (const el of orderedInteractiveEls.reverse().slice(1)) {
			cy.get('body').realPress('Tab');
			cy.focused().should('have.attr', 'data-testid', el);
		}
	});

	it('disables the join button if missing required fields', () => {
		cy.get('@btn').should('have.attr', 'disabled', true);

		cy.get('@btn').should('have.attr', 'disabled', true);

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('have.attr', 'disabled', true);

		cy.get('@password').type(goodPassword);
		cy.get('@btn').should('have.attr', 'disabled', false);

		cy.get('@email').type('');
		cy.get('@btn').should('have.attr', 'disabled', true);

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('have.attr', 'disabled', false);
	});

	it('clicking on the swap mode button takes the user to the join page', () => {
		cy.get('@swap').click();
		cy.url().should('eq', 'http://localhost:3000/join');
	});

	it('validates each input lazily, on unfocus', () => {
		cy.get('@email').type(badEmail);
		cy.get('@password').focus();
		// expect error message

		cy.get('@password').type(badPassword);
		cy.get('@email').focus();
		// expect error message
	});

	it('displays an error if the email address is taken', () => {
		signinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('displays an error if the provided credentials are invalid', () => {
		cy.get('@email').type('email@email.com');
		cy.get('@password').focus();
		// expect error message

		cy.get('@password').type('wrong_pw');
		cy.get('@email').focus();
		// expect error message

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('redirects the user to the landing page once authenticated', () => {
		signinUser();

		cy.url().should('eq', 'http://localhost:3000/');
	});

	it.skip('redirects authenticated users to the landing page on load', () => {
		cy.url().should('eq', 'http://localhost:3000/');
	});
});
