import { TEXT_SEARCH } from '@@/fixtures'
import { join, search, signin } from '@@/utils'
import { ERROR_MESSAGES } from '@uxc/common/node'
import request from 'supertest'

import { app } from '@/app'
import { seed } from '@/schema/resolvers/mutations/computed/seed'

import testMessages from '../../../../../test/fixtures/messages.json'

import type { Message, PrivateThread } from '@uxc/common/node'

const testSubject = 'search'

describe(`${testSubject} workflow`, () => {
  it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
    const { body } = await request(app)
      .post(BASE_PATH)
      .send({
        query: TEXT_SEARCH,
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when not provided a query', async () => {
    const { cookie } = await join()
    const { body } = await search({ cookie, variables: {} })

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_QUERY)

    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('returns message results', async () => {
    const expectedMatches = 4
    const query = 'test'

    const { user } = await seed()
    const response = await signin(user)
    const { body } = await search({
      cookie: response.get('Set-Cookie'),
      variables: { query },
    })

    const data: Message[] = body.data.search

    data.forEach(result => {
      expect(result.body.toLowerCase()).toContain(query)
    })

    expect(data.map(result => result.body)).toStrictEqual(
      expect.arrayContaining(testMessages.slice(0, expectedMatches)),
    )
  })

  it('returns private thread results', async () => {
    const { user, users } = await seed()
    const query = users[0].username

    const response = await signin(user)

    const { body } = await search({
      cookie: response.get('Set-Cookie'),
      variables: { query },
    })

    const data: PrivateThread[] = body.data.search

    const spy = jest.fn()
    data[0].users.forEach(({ username }) => {
      if (username.toLowerCase().includes(query.toLowerCase())) {
        spy()
      }
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('ignores messages not to or from the current user', async () => {
    const query = 'test'
    await seed()
    const { cookie } = await join()

    const { body } = await search({
      cookie,
      variables: { query },
    })

    const data = body.data.search

    expect(data).toHaveLength(0)
  })

  it('ignores threads in which the current user is not a member', async () => {
    const { users } = await seed()
    const query = users[0].username

    const { cookie } = await join()

    const { body } = await search({
      cookie,
      variables: { query },
    })
    const data = body.data.search

    expect(data).toHaveLength(0)
  })
})
