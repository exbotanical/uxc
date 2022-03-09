/**
 * Select a `data-testid` element by its exact key
 */
Cypress.Commands.add('getByTestId', (selector: string) => {
	return cy.get(`[data-testid=${selector}]`);
});

/**
 * Select a `data-testid` element by its approximate key
 */
Cypress.Commands.add('getByTestIdLike', (selector: string) => {
	return cy.get(`[data-testid*=${selector}]`);
});

/**
 * Assert element contains a given class
 */
Cypress.Commands.add(
	'containsClass',
	(selector: string, expectedClass: string) => {
		return cy.get(selector).should('satisfy', ($el) => {
			const classList = Array.from<string>($el[0].classList);

			return classList.includes(expectedClass);
		});
	}
);

/**
 * Assert element does not contain a given class
 */
Cypress.Commands.add(
	'omitsClass',
	(selector: string, expectedClass: string) => {
		return cy.get(selector).should('satisfy', ($el) => {
			const classList = Array.from<string>($el[0].classList);

			return !classList.includes(expectedClass);
		});
	}
);

interface GQLResponse<T> {
	data: T;
	errors?: {
		message: string;
		extensions: {
			code: string;
		};
	}[];
}

Cypress.Commands.add(
	'interceptGQL',
	<T>(url: string, operation: string, data: GQLResponse<T>, alias?: string) => {
		// retrieve any previously registered interceptions
		const previous = Cypress.config('interceptions');
		const alreadyRegistered = url in previous;

		const next = {
			...(previous[url] || {}),
			[operation]: { alias, data }
		};

		// Merge in the new interception.
		Cypress.config('interceptions' as keyof Cypress.TestConfigOverrides, {
			...previous,
			[url]: next
		});
		// @todo fix getThreads and other subsequent requests
		console.log({ url, previous });
		// No need to register handler more than once per URL. Operation data is
		// dynamically chosen within the handler.
		if (alreadyRegistered) {
			return;
		}

		cy.intercept('POST', url, (req) => {
			const interceptions = Cypress.config('interceptions');

			// @see https://graphql.org/learn/serving-over-http/#post-request
			// "operationName is only required if multiple operations are present in the query."
			const match = req.body.operationName
				? interceptions[url]?.[req.body.operationName]
				: interceptions[url][operation];

			if (match) {
				// req.alias = match.alias;
				req.reply({ body: match.data });
			}
		});
	}
);
