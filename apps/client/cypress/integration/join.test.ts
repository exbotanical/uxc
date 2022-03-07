import { aliasQuery } from '../utils';

describe('join workflow', () => {
	const goodUsername = 'cypress_user';
	const goodEmail = 'cypress@cypress.com';
	const goodPassword = 'cypress_1password';

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
		cy.get('@btn').should('have.attr', 'disabled');

		cy.get('@username').type(goodUsername);
		cy.get('@btn').should('have.attr', 'disabled');

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('have.attr', 'disabled');

		cy.get('@password').type(goodPassword);
		cy.get('@btn').should('not.have.attr', 'disabled');

		cy.get('@email').clear();
		cy.get('@btn').should('have.attr', 'disabled');

		cy.get('@email').type(goodEmail);
		cy.get('@btn').should('not.have.attr', 'disabled');
	});

	it.skip('clicking on the swap mode button takes the user to the signin page', () => {
		cy.get('@swap').click();
		cy.url().should('eq', 'http://localhost:3000/signin');
	});

	it.skip('validates each input lazily, on unfocus', () => {
		cy.get('@username');
		cy.get('@email').focus();
		cy.get('@username')
			.getByTestId('input-error')
			.then((el) => {
				expect(el).to.contain('A valid username is required.');
			});

		cy.get('@email');
		cy.get('@password').focus();
		cy.get('@username')
			.getByTestId('input-error')
			.then((el) => {
				expect(el).to.contain('A valid email address is required.');
			});

		cy.get('@password');
		cy.get('@username').focus();
		cy.get('@username')
			.getByTestId('input-error')
			.then((el) => {
				expect(el).to.contain('A valid password is required.');
			});
	});

	it('validates the username', () => {
		cy.get('@username').type('cy');
		cy.get('@email').focus();
		cy.get('@username')
			.getByTestId('input-error')
			.then((el) => {
				expect(el).to.contain(
					'Your username must contain more than 3 characters.'
				);
			});

		cy.get('@username').type(
			'cyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
		);
		cy.get('@email').focus();
		cy.get('@username')
			.getByTestId('input-error')
			.then((el) => {
				expect(el).to.contain(
					'Your username must contain fewer than 22 characters.'
				);
			});
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
