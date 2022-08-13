import { decode, verify } from '@/utils'
import { createSession } from '@/utils/auth'

import type { NextFunction, Request, Response } from 'express'

export function refreshMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { accessToken, refreshToken } = req.session
  if (!accessToken) {
    next()
    return
  }

  const { payload, expired } = verify({ token: accessToken })

  // invalid token e.g. wrong secret or authority
  if (!payload && !expired) {
    req.session.meta = undefined
  }

  if (payload) {
    req.session.meta = payload
    next()
    return
  }

  const { payload: refresh } =
    expired && refreshToken
      ? verify({
          isRefresh: true,
          token: refreshToken,
        })
      : { payload: null }

  if (!refresh) {
    next()
    return
  }

  const session = createSession(refresh.id)
  const decoded = decode(session.accessToken)

  Object.assign(req.session, session, { meta: decoded })

  next()
}
