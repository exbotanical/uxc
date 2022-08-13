import { GET_FRIENDS } from '@@/fixtures'
import { getFriends, signin } from '@@/utils'
import { ERROR_MESSAGES } from '@uxc/common/node'
import request from 'supertest'

import { app } from '@/app'
import { seed } from '@/schema/resolvers/mutations/computed/seed'

const testSubject = 'getFriends'
describe(`${testSubject} workflow`, () => {
  it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
    const { body } = await request(app)
      .post(BASE_PATH)
      .send({
        query: GET_FRIENDS,
        variables: {
          type: 'RECV',
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('retrieves all friends', async () => {
    const { user } = await seed()

    const response = await signin(user)

    const { body } = await getFriends({
      cookie: response.get('Set-Cookie'),
    })

    const friends = body.data.getFriends

    expect(friends).toHaveLength(11)
  })
})
