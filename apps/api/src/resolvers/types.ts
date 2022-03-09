import type { AllNullableOrUndef, Context } from '@uxc/types/node';

export type Problem = {
	message: string;
	type: string;
};

export type ProblemResponse = {
	ok: false;
	problems: Problem[];
	payload: null;
};

export type OkResponse<T> = {
	ok: true;
	problems: null;
	payload: T;
};

export type MaybeResponse<T> = ProblemResponse | OkResponse<T>;

export type Resolver<ReturnValue, Args = Record<string, unknown>> = (
	parent: Record<string, unknown>,
	args: Args extends undefined ? undefined : AllNullableOrUndef<Args>,
	context: Context
) => Promise<ReturnValue | null>;

export type MaybeErrorResolver<
	ReturnValue,
	Args = Record<string, unknown>
> = Resolver<MaybeResponse<ReturnValue>, Args>;
