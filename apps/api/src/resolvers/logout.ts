import { invalidateSession } from '@/utils';

import type { MutationResolvers } from '@uxc/types/generated';

export const logoutResolver: MutationResolvers['logout'] = async (
	_,
	__,
	{ req }
) => {
	invalidateSession(req);

	return '';
};
