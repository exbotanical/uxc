
import currentUserOk from '@/fixtures/getCurrentUser/ok.json';
import getMessagesOk from '@/fixtures/getMessages/ok1.json';
import getThreadsOk from '@/fixtures/getThreads/ok.json';
import searchFriends from '@/fixtures/searchFriends/all-both.json';

import type { Rule } from 'axe-core';

const unauthenticatedTestUrls = ['/signin', '/join'];
const authenticatedTestUrls = ['/', '/622a1412cbc9a5e523cd0a7b'];

const disabledRules: Rule[] = [
	/*
	 * see discussion https://github.com/dequelabs/axe-core/issues/795
	 * my personal take is that this rule is in some cases contradictory
	 * and such a case is applicable here, hence disabling it
	 */
	{ id: 'landmark-complementary-is-top-level', enabled: false },
	{ id: 'color-contrast', enabled: false }
];

const axeFalsePositives: Rule[] = [];

const bypassedRules = [{ id: 'page-has-heading-one', enabled: false }];

// false positives during dev only (via `test:cy:dev` script)
const devFalsePositives: Rule[] = [];

const assertAll = () => {
	disabledRules.push(...axeFalsePositives, ...bypassedRules);

	if (Cypress.env('STAGE') === 'dev') {
		disabledRules.push(...devFalsePositives);
	}

	cy.configureAxe({
		rules: disabledRules
	});

	cy.checkA11y();
};

const runTest = (url: string) => {
	cy.visit(url).injectAxe();

	cy.wait(1000);

	assertAll();
};

describe('accessibility', () => {
	beforeEach(() => {
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {});
	});

	unauthenticatedTestUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			runTest(url);
		});
	});

	authenticatedTestUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			cy.interceptGQL(
				'http://localhost/api/graphql',
				'getCurrentUser',
				currentUserOk
			)
				.interceptGQL(
					'http://localhost/api/graphql',
					'getThreads',
					getThreadsOk
				)
				.interceptGQL(
					'http://localhost/api/graphql',
					'getMessages',
					getMessagesOk
				)
				.interceptGQL(
					'http://localhost/api/graphql',
					'searchFriends',
					searchFriends
				);

			runTest(url);
		});
	});
});
