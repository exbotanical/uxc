import type { AllNullableOrUndef, Context } from '@uxc/types';

export type Resolver<ReturnValue, Args = Record<string, unknown>> = (
	parent: Record<string, unknown>,
	args: Args extends undefined ? undefined : AllNullableOrUndef<Args>,
	context: Context
) => Promise<ReturnValue | null>;
