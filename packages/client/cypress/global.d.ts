declare namespace Cypress {
	type CypressInstance = Chainable<JQuery>;

	interface ResolvedConfigOptions {
		interceptions: {
			[url: string]: {
				[operation: string]: {
					alias?: string;
					data: unknown;
				};
			};
		};
	}

	interface Chainable {
		getByTestId(selector: string): CypressInstance;
		getByTestIdLike(selector: string): CypressInstance;
		containsClass(selector: string, expectedClass: string): CypressInstance;
		omitsClass(selector: string, expectedClass: string): CypressInstance;
		interceptGQL<T>(
			url: string,
			operation: string,
			data: GQLResponse<T>,
			alias?: string
		): Cypress.cy;
	}
}
