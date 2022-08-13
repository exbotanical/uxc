import { invalidateSession } from '@/utils'

import type { MutationResolvers } from '@uxc/common/generated'

export const signoutResolver: MutationResolvers['signout'] = (
  _,
  __,
  { req },
) => {
  invalidateSession(req)

  return ''
}
