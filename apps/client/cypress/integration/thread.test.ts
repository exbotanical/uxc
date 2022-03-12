import currentUserOk from '../fixtures/getCurrentUser/ok.json';
import getMessagesOk from '../fixtures/getMessages/ok1.json';
import getThreadsOk from '../fixtures/getThreads/ok.json';

describe('thread chatroom functionality', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		);

		cy.interceptGQL('http://localhost/api/graphql', 'getThreads', getThreadsOk);

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getMessages',
			getMessagesOk
		);

		cy.visit('/622a1412cbc9a5e523cd0a7b');
	});

	it('loads the thread messages', () => {
		const messages = getMessagesOk.data.getMessages;

		cy.getByTestId('messages-container')
			.children()
			.getByTestId('message-body')
			.each((el, idx) => {
				cy.wrap(el).should('contain', messages[idx]?.body);
			});
	});

	it.skip('allows the user to edit their own messages', () => {});

	it.skip('allows the user to emote upon any message', () => {});

	// @todo start tabbing in a reasonable pos of chatroom (not always top)
	// @todo tab cycle through message options
	it.skip('cycles focus through each message and its controls', () => {
		cy.get('body').realPress('Tab');
		cy.focused().should('have.attr', 'data-testid', 'uxc-search-btn');

		cy.get('body').realPress('Tab');
		cy.focused().should('have.attr', 'data-testid', 'friends-btn');
	});
});
