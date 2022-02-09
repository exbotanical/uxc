import type { AllNullableOrUndef, Context } from '@uxc/types';

export type Resolver<ReturnValue, Args = {}> = (
	parent: {},
	args: Args extends undefined ? undefined : AllNullableOrUndef<Args>,
	context: Context
) => Promise<ReturnValue | null>;
