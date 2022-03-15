import currentUserOk from '../../fixtures/getCurrentUser/ok.json';
import getMessagesOk from '../../fixtures/getMessages/ok1.json';
import getThreadsOk from '../../fixtures/getThreads/ok.json';

import type { Rule } from 'axe-core';

const unauthenticatedTestUrls = ['/signin', '/join'];
const authenticatedTestUrls = ['/', '/friends', '/622a1412cbc9a5e523cd0a7b'];

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
	cy.visit(url);
	cy.injectAxe();
	assertAll();
};

describe('accessibility', () => {
	beforeEach(() => {
		Cypress.config('interceptions', {});
	});

	unauthenticatedTestUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			runTest(url);
		});
	});

	authenticatedTestUrls.forEach((url, idx) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			if (idx === 0) {
				cy.interceptGQL(
					'http://localhost/api/graphql',
					'getCurrentUser',
					currentUserOk
				);

				cy.interceptGQL(
					'http://localhost/api/graphql',
					'getThreads',
					getThreadsOk
				);

				cy.interceptGQL(
					'http://localhost/api/graphql',
					'getMessages',
					getMessagesOk
				);
			}

			runTest(url);
		});
	});
});
