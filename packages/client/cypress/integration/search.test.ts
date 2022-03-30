import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import getThreadsOk from '@/fixtures/getThreads/ok.json';
import searchOr from '@/fixtures/search/or.json';
import searchQuo from '@/fixtures/search/quo.json';
import getMessagesOk from '@/fixtures/getMessages/ok1.json';

const orResult = searchOr.data.search[0];
const quoResults = searchQuo.data.search;

describe('search workflow and associated functionality', () => {
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

	it('displays a no results text when no hits were found', () => {
		cy.getByTestId('search-btn')
			.click()
			.getByTestId('search-input')
			.type('or')
			.getByTestId('search-content-src')
			.should('contain', 'No results for "or"')

			.getByTestId('search-input')
			.clear()
			.getByTestId('search-content-src')
			.should('contain', 'No recent searches');
	});

	it('displays search results for a given query', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestIdLike('search-hit-')
			.its('length')
			.then(($length) => {
				expect($length).equal(1);
			})

			.getByTestId('search-content-src')
			.should('contain', 'Chat Threads')

			.getByTestIdLike(`search-hit-${orResult._id}`)
			.should('contain', orResult.users[1].username)

			.interceptGQL('http://localhost/api/graphql', 'search', searchQuo)

			.getByTestId('search-input')
			.clear()
			.type('quo')

			.getByTestIdLike('search-hit')
			.its('length')
			.then(($length) => {
				expect($length).equal(quoResults.length);
			})

			.getByTestId('search-content-src')
			.should('contain', 'Messages');

		for (const quoResult of quoResults) {
			cy.getByTestId(`search-hit-${quoResult._id}`).should(
				'contain',
				quoResult.body
			);
		}
	});

	it('follows a search result link to its chat thread when clicking on a user result', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestId(`search-hit-${orResult._id}`)
			.click()

			.url()
			.should('eq', `http://localhost:3000/${orResult._id}`);
	});

	it('follows a search result link to its message position in its chat thread when clicking on a message result', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchQuo)

			.interceptGQL(
				'http://localhost/api/graphql',
				'getMessages',
				getMessagesOk
			)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('quo')

			.getByTestId(`search-hit-${quoResults[0]._id}`)
			.click()

			.url()
			.should('eq', `http://localhost:3000/${quoResults[0].threadId._id}`)

			.getByTestId(`message-${quoResults[0]._id}`)
			.should('be.visible');
	});

	it('adds search results to the search history', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestId(`search-hit-${orResult._id}`)
			.click()

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.clear()

			.getByTestId('search-content-src')
			.should('contain', 'Recent')

			.getByTestIdLike(`search-history-hit`)
			.its('length')
			.then(($length) => {
				expect($length).equal(1);
			})

			.get(`[data-testid=search-history-hit-${orResult._id}] span:first-child`)
			.should('contain', 'Chat Thread')

			.get(
				`[data-testid=search-history-hit-${orResult._id}] span:not(:first-child)`
			)
			.should('contain', orResult.users[1].username);
	});

	it('adds or removes a search result to or from favorites when its favorite button is clicked', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestId(`search-hit-${orResult._id}`)
			.click()

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.clear()

			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Favo]')
			.click()

			.getByTestId('search-content-src')
			.should('contain', 'Favorites')

			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Unfavo]')
			.click()

			.getByTestId(`search-hit-${orResult._id}`)
			.should('not.exist');
	});

	it('persists favorited results between refreshes', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestId(`search-hit-${orResult._id}`)
			.click()

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.clear()

			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Favo]')
			.click()

			.reload()
			.getByTestId('search-btn')
			.click()

			.getByTestId('search-content-src')
			.should('contain', 'Favorites')

			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Unfavo]')
			.should('exist');
	});

	it("removes a favorite via the 'remove favorite' button ", () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')

			.getByTestId(`search-hit-${orResult._id}`)
			.click()

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.clear()

			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Remo]')
			.click()

			.getByTestId(`search-history-hit-${orResult._id}`)
			.should('not.exist');
	});

	it('cycles through the results via the down/up arrow keys', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchQuo)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('quo');

		const resultsCount = quoResults.length;

		for (let i = 0; i < resultsCount; i++) {
			cy.log(`Testing result record ${i + 1} of ${resultsCount}`);

			cy.getByTestId(`search-hit-${quoResults[i]._id}`)
				.should('have.attr', 'aria-selected')

				.get('body')
				.type('{downarrow}');
		}

		for (let i = resultsCount - 1; i > 0; i--) {
			cy.log(`Testing result record ${i} of ${resultsCount}`);

			cy.getByTestId(`search-hit-${quoResults[i]._id}`)
				.should('have.attr', 'aria-selected')

				.get('body')
				.type('{uparrow}');
		}
	});

	it('follows a search result link via the enter key', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)

			.getByTestId('search-btn')
			.click()

			.getByTestId('search-input')
			.type('or')
			.getByTestId(`search-hit-${orResult._id}`)
			.should('exist') // wait for results

			.get('body')
			.type('{downarrow}')
			.type('{enter}')
			.url()
			.should('eq', `http://localhost:3000/${orResult._id}`);
	});

	it('supports the search workflow and search result actions via keyboard', () => {
		cy.interceptGQL('http://localhost/api/graphql', 'search', searchOr)
			.getByTestId('search-btn')
			.click()
			.getByTestId('search-input')
			.type('or')

			// select and activate result
			.get('body')
			.type('{downarrow}')
			.realPress('Enter')

			// tab back to the search modal
			.realPress('Tab')
			.realPress('Enter')
			.getByTestId('search-input')
			.clear()
			.getByTestId(`search-history-hit-${orResult._id}`)
			.should('exist')

			// tab down to the favorite button
			.get('body')
			.type('{downarrow}')
			.realPress('Tab')
			.realPress('Enter')

			// should be added to favorites now
			.getByTestId('search-content-src')
			.should('contain', 'Favorites')
			.getByTestId(`search-history-hit-${orResult._id}`)
			.find('[title^=Unfavo]')
			.should('exist')

			// unfavorite now
			.get('body')
			.type('{downarrow}')
			.realPress('Tab')
			.realPress('Enter')
			.getByTestId(`search-history-hit-${orResult._id}`)
			.should('not.exist')

			.getByTestId('search-content-src')
			.should('contain', 'No recent searches');
	});
});
