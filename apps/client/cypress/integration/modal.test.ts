import currentUserOk from '../fixtures/getCurrentUser/ok.json';
import getThreadsOk from '../fixtures/getThreads/ok.json';

const overlayTestId = 'modal-overlay';

describe('modal accessibility and functionality', () => {
	beforeEach(() => {
		Cypress.config('interceptions', {});

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		);

		cy.interceptGQL('http://localhost/api/graphql', 'getThreads', getThreadsOk);

		cy.visit('/');
	});

	it('traps focus inside the modal, cycling all tab-able elements', () => {
		cy.getByTestId('uxc-search-btn').click();

		const orderedFocusIds = [
			'uxc-search-input',
			'uxc-search-clear-input-btn',
			'uxc-search-esc-btn'
		];

		let counter = 0;

		// focus forwards
		do {
			cy.focused().should('have.attr', 'data-testid', orderedFocusIds[counter]);
			cy.get('body').realPress('Tab');
		} while (++counter < orderedFocusIds.length);

		// we always end up at the first el
		cy.focused().should('have.attr', 'data-testid', orderedFocusIds[0]);

		// now reverse
		do {
			cy.get('body').realPress(['Shift', 'Tab']);
			cy.focused().should(
				'have.attr',
				'data-testid',
				orderedFocusIds[counter - 1]
			);
		} while (--counter > 0);

		// again, we should end up at the first el
		cy.focused().should('have.attr', 'data-testid', orderedFocusIds[0]);
	});

	it('closes the modal when the user presses the escape key', () => {
		cy.getByTestId(overlayTestId).should('not.exist');
		cy.getByTestId('uxc-search-btn').click();

		cy.getByTestId(overlayTestId).should('exist');

		cy.get('body').type('{esc}');
		cy.getByTestId(overlayTestId).should('not.exist');
	});

	it('closes the modal when the user clicks the close button', () => {
		cy.getByTestId(overlayTestId).should('not.exist');
		cy.getByTestId('uxc-search-btn').click();

		cy.getByTestId(overlayTestId).should('exist');

		cy.getByTestId('uxc-search-esc-btn').click();
		cy.getByTestId(overlayTestId).should('not.exist');
	});

	it('closes the modal when the user clicks outside the modal', () => {
		cy.getByTestId(overlayTestId).should('not.exist');
		cy.getByTestId('uxc-search-btn').click();

		cy.getByTestId(overlayTestId).should('exist');

		cy.getByTestId('modal-overlay').click();
		cy.getByTestId(overlayTestId).should('not.exist');
	});
});
