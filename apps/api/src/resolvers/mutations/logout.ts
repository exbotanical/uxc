import type { MutationResolvers } from '@uxc/types/generated';

import { invalidateSession } from '@/utils';

export const logoutResolver: MutationResolvers['logout'] = async (
	_,
	__,
	{ req }
) => {
	invalidateSession(req);

	return '';
};
