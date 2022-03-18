/* eslint-disable @typescript-eslint/no-unused-vars */
import currentUserOk from '../fixtures/getCurrentUser/ok.json';
import getThreadsOk from '../fixtures/getThreads/ok.json';

describe('landing / dashboard experience', () => {
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

	it('loads the users threads in the sidebar', () => {
		cy.url().should('eq', 'http://localhost:3000/');

		for (const { _id, users } of getThreadsOk.data.getThreads) {
			const targetUser = users.find(
				(user) => user._id !== '62286019001e6e232d9e0d69'
			);

			cy.getByTestId(`thread-${_id}`).find('p').contains(targetUser!.username);
		}
	});

	it('walks the threads via the arrow keys', () => {
		const threads = getThreadsOk.data.getThreads;

		cy.wait(1000); // @todo look at cypress intercept problems notes and diagnose

		cy.getByTestId('dm-btn').focus();

		for (const { _id } of threads) {
			cy.get('body').type('{downarrow}');

			cy.focused().should('have.attr', 'data-testid', `thread-${_id}`);
		}

		for (const { _id } of threads.slice().reverse()) {
			cy.focused().should('have.attr', 'data-testid', `thread-${_id}`);
			cy.get('body').type('{uparrow}');
		}
	});

	it('stops at the last thread regardless of down arrow keypresses after the focus thereof', () => {
		const threads = getThreadsOk.data.getThreads;
		const last = threads[threads.length - 1];

		cy.wait(1000); // @todo look at cypress intercept problems notes and diagnose

		cy.getByTestId('dm-btn').focus();

		for (const _ of threads) {
			cy.get('body').type('{downarrow}');
		}

		cy.get('body').type('{downarrow}');
		cy.get('body').type('{downarrow}');
		cy.get('body').type('{downarrow}');

		cy.focused().should('have.attr', 'data-testid', `thread-${last._id}`);
	});

	it('stops at the first thread regardless of up arrow keypresses after the focus thereof', () => {
		const threads = getThreadsOk.data.getThreads;
		const first = threads[0];

		cy.wait(1000); // @todo look at cypress intercept problems notes and diagnose

		cy.getByTestId('dm-btn').focus();

		for (const _ of threads) {
			cy.get('body').type('{downarrow}');
		}

		for (const _ of threads) {
			cy.get('body').type('{uparrow}');
		}

		cy.get('body').type('{uparrow}');
		cy.get('body').type('{uparrow}');
		cy.get('body').type('{uparrow}');
		cy.focused().should('have.attr', 'data-testid', `thread-${first._id}`);
	});

	it('defaults to the friends page', () => {
		cy.getByTestId('search-friends').should('exist');
	});

	it('opens a chat room when clicking on a thread item', () => {
		const threads = getThreadsOk.data.getThreads;

		cy.wait(1000); // @todo look at cypress intercept problems notes and diagnose
		cy.getByTestId('dm-btn').focus();

		for (const { _id } of threads) {
			cy.getByTestId(`thread-${_id}`).click();
			cy.url().should('eq', `http://localhost:3000/${_id}`);
		}
	});
});
