import type { MutationResolvers } from '@uxc/common/generated';

import { invalidateSession } from '@/utils';

export const signoutResolver: MutationResolvers['signout'] = (
	_,
	__,
	{ req }
) => {
	invalidateSession(req);

	return '';
};
