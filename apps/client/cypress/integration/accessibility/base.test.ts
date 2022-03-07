import type { Rule } from 'axe-core';

const unauthenticatedTestUrls = ['/signin', '/join'];
const authenticatedTestUrls = ['/', '/friends', '/thread/123345'];

const assertAll = () => {
	const disabledRules: Rule[] = [
		/*
		 * see discussion https://github.com/dequelabs/axe-core/issues/795
		 * my personal take is that this rule is in some cases contradictory
		 * and such a case is applicable here, hence disabling it
		 */
		{ id: 'landmark-complementary-is-top-level', enabled: false }
	];

	const axeFalsePositives: Rule[] = [
		// { id: 'duplicate-id', enabled: false },
		// { id: 'document-title', enabled: false },
		// { id: 'html-has-lang', enabled: false }
	];

	const bypassedRules = [
		// { id: 'page-has-heading-one', enabled: false }
	];

	disabledRules.push(...axeFalsePositives, ...bypassedRules);

	// false positives during dev only (via `test:cy:dev` script)
	const devFalsePositives = [
		// { id: 'landmark-no-duplicate-contentinfo', enabled: false },
		// { id: 'landmark-unique', enabled: false }
	];

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
	// beforeEach(() => {
	// 	cy.authorizedVisit();
	// });

	unauthenticatedTestUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load [dark mode]`, () => {
			runTest(url);
		});
	});

	authenticatedTestUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load [dark mode]`, () => {
			runTest(url);
		});
	});
});
