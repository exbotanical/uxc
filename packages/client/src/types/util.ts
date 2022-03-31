export type MutationFunction<
	ReturnVal extends Record<string, any>,
	Args extends Record<string, any>
> = (options: { variables: Args }) => Promise<{ data?: ReturnVal | null }>;
