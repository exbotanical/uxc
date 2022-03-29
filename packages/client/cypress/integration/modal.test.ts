import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import getThreadsOk from '@/fixtures/getThreads/ok.json';

const overlayTestId = 'modal-overlay';

describe('modal accessibility and functionality', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		)

			.interceptGQL('http://localhost/api/graphql', 'getThreads', getThreadsOk)

			.visit('/');
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
			cy.focused()
				.should('have.attr', 'data-testid', orderedFocusIds[counter])

				.get('body')
				.realPress('Tab');
		} while (++counter < orderedFocusIds.length);

		// we always end up at the first el
		cy.focused().should('have.attr', 'data-testid', orderedFocusIds[0]);

		// now reverse
		do {
			cy.get('body')
				.realPress(['Shift', 'Tab'])

				.focused()
				.should('have.attr', 'data-testid', orderedFocusIds[counter - 1]);
		} while (--counter > 0);

		// again, we should end up at the first el
		cy.focused().should('have.attr', 'data-testid', orderedFocusIds[0]);
	});

	it('closes the modal when the user presses the escape key', () => {
		cy.getByTestId(overlayTestId)
			.should('not.exist')
			.getByTestId('uxc-search-btn')
			.click()

			.getByTestId(overlayTestId)
			.should('exist')

			.get('body')
			.type('{esc}')
			.getByTestId(overlayTestId)
			.should('not.exist');
	});

	it('closes the modal when the user clicks the close button', () => {
		cy.getByTestId(overlayTestId)
			.should('not.exist')
			.getByTestId('uxc-search-btn')
			.click()

			.getByTestId(overlayTestId)
			.should('exist')

			.getByTestId('uxc-search-esc-btn')
			.click()
			.getByTestId(overlayTestId)
			.should('not.exist');
	});

	it('closes the modal when the user clicks outside the modal', () => {
		cy.getByTestId(overlayTestId)
			.should('not.exist')
			.getByTestId('uxc-search-btn')
			.click()

			.getByTestId(overlayTestId)
			.should('exist')

			.getByTestId('modal-overlay')
			.click()
			.getByTestId(overlayTestId)
			.should('not.exist');
	});
});
