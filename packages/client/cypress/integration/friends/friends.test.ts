import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import getMessagesOk from '@/fixtures/getMessages/ok1.json';
import getThreadsOk from '@/fixtures/getThreads/ok.json';
import searchFriends from '@/fixtures/searchFriends/all-both.json';

const searchFriendsPayload = searchFriends.data.searchFriends;
const allFriends = [
	...searchFriendsPayload.friends,
	...searchFriendsPayload.received,
	...searchFriendsPayload.sent
];

describe('friends workflows and filtering functionality', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});

		cy.interceptGQL(
			'http://localhost/api/graphql',
			'getCurrentUser',
			currentUserOk
		)

			.interceptGQL('http://localhost/api/graphql', 'getThreads', getThreadsOk)

			.interceptGQL(
				'http://localhost/api/graphql',
				'getMessages',
				getMessagesOk
			)

			.visit('/');
	});

	it.skip("displays all friends with an online status in the 'All' tab", () => {});

	it.skip("filters all friends with an online status in the 'All' tab", () => {});

	it("displays all friends and friend requests in the 'All' tab", () => {
		cy.interceptGQL(
			'http://localhost/api/graphql',
			'searchFriends',
			searchFriends
		)
			.getByTestIdLike(`friend-hit`)
			.as('friends')

			.get(`@friends`)
			.its('length')
			.then(($count) => {
				expect($count).equal(allFriends.length);
			})

			.getByTestIdLike(`friend-hit-sent`)
			.its('length')
			.then(($count) => {
				expect($count).equal(5);
			})

			.getByTestIdLike(`friend-hit-recv`)
			.its('length')
			.then(($count) => {
				expect($count).equal(5);
			})

			.get(`@friends`)
			.each(($friend, idx) => {
				cy.wrap($friend).get('h4').should('contain', allFriends[idx].username);
			});
	});

	it("filters all friends in the 'All' tab", () => {
		cy.interceptGQL(
			'http://localhost/api/graphql',
			'searchFriends',
			searchFriends
		)

			.getByTestIdLike(`friend-hit`)
			.as('friends')

			.getByTestId('filter-friends')
			.type('b')
			.get(`@friends`)
			.its('length')
			.then(($count) => {
				expect($count).equal(5);
			})

			.getByTestId('filter-friends')
			.clear()
			.type('a')
			.getByTestIdLike(`friend-hit`)
			.its('length')
			.then(($count) => {
				expect($count).equal(16);
			})

			.getByTestId('filter-friends')
			.clear()
			.type('ra')
			.getByTestIdLike(`friend-hit`)
			.its('length')
			.then(($count) => {
				expect($count).equal(1);
			});
	});

	it("displays all sent and received pending friend requests in the 'Pending' tab", () => {
		cy.interceptGQL(
			'http://localhost/api/graphql',
			'searchFriends',
			searchFriends
		)

			.getByTestId('pending-tab')
			.click()

			// only 10 in total
			.getByTestIdLike(`friend-hit`)
			.its('length')
			.then(($count) => {
				expect($count).equal(10);
			})

			.getByTestIdLike(`friend-hit-sent`)
			.its('length')
			.then(($count) => {
				expect($count).equal(5);
			})

			.getByTestIdLike(`friend-hit-recv`)
			.its('length')
			.then(($count) => {
				expect($count).equal(5);
			});
	});

	it.skip("displays blocked friends and users in the 'Blocked' tab", () => {});

	it.skip('prompts the user with a confirmation dialog before removing a friend', () => {});
	it.skip('removes a friend when clicking the remove friend button', () => {});

	it.skip('rejects a pending friend request when clicking the reject friend request button', () => {});
	it.skip('accepts a pending friend request when clicking the accept friend request button', () => {});
	it.skip('cancels a pending sent friend request when clicking the cancel friend request button', () => {});

	it.skip('directs to the corresponding chat thread - if extant - when clicking on the message friend button', () => {});
	it.skip('directs to a new chat thread - if one was not extant - when clicking on the message friend button', () => {});
});
