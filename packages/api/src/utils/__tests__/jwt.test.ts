import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

import { decode, sign, verify } from '../jwt'

describe('jwt utilities', () => {
  it('correctly signs jwt accessTokens', () => {
    const id = new ObjectId().toString()

    const accessToken = decode(sign({ id }))

    if (!accessToken || !accessToken.exp) {
      throw new Error(
        'accessToken and its expiration timestamp should be defined',
      )
    }

    const diff =
      new Date(accessToken.exp * 1000).valueOf() - new Date().valueOf()

    const diffInMinutes = diff / 1000 / 60

    expect(Math.round(diffInMinutes)).toBe(60)
  })

  it('correctly signs jwt refreshTokens', () => {
    const id = new ObjectId().toString()

    const refreshToken = decode(sign({ id, isRefresh: true }))

    if (!refreshToken || !refreshToken.exp) {
      throw new Error(
        'refreshToken and its expiration timestamp should be defined',
      )
    }

    const diff =
      new Date(refreshToken.exp * 1000).valueOf() - new Date().valueOf()

    const diffInMinutes = diff / 1000 / 60
    const sevenDaysInMinutes = 7 * 24 * 60

    expect(Math.round(diffInMinutes)).toStrictEqual(sevenDaysInMinutes)
  })

  it('identifies expired tokens when verifying', () => {
    // jest.useFakeTimers();

    const id = new ObjectId().toString()
    const secret = process.env.ACCESS_TOKEN_SIGNING_KEY

    const token = jwt.sign({ id }, secret, {
      expiresIn: 0,
      issuer: process.env.JWT_AUTHORITY,
    })

    // jest.advanceTimersByTime(1000);

    const ret = verify({ token })

    expect(ret.expired).toBe(true)

    // jest.clearAllTimers();
  })

  it('identifies invalid tokens when verifying', () => {
    const id = new ObjectId().toString()
    const wrongSecret = 'secret'

    const token = jwt.sign({ id }, wrongSecret, {
      issuer: process.env.JWT_AUTHORITY,
    })

    const ret = verify({ token })

    expect(ret).toStrictEqual({ expired: false, payload: null })
  })
})
