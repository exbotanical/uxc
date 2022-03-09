declare namespace Cypress {
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

	type CypressInstance = Chainable<JQuery>;

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
		): void;
	}
}
