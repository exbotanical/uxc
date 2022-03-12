import currentUserOk from '../fixtures/getCurrentUser/ok.json';
import getThreadsOk from '../fixtures/getThreads/ok.json';

const overlayTestId = 'modal-overlay';

describe('modal accessibility and functionality', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		);

		cy.interceptGQL('http://localhost/api/graphql', 'getThreads', getThreadsOk);

		cy.visit('/');
	});

	it('mounts a modal in a portal element', () => {
		cy.getByTestId(overlayTestId).should('not.exist');
		cy.getByTestId('uxc-search-btn').click();

		cy.getByTestId(overlayTestId).should('exist');

		cy.get('#root')
			// skip script
			.next()
			.next()
			.should('have.attr', 'data-testid', overlayTestId)
			.should('have.attr', 'role', 'dialog');
	});
});
