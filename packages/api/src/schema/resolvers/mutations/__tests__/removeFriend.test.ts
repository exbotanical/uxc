import { REMOVE_FRIEND, UPDATE_FRIEND_REQUEST } from '@@/fixtures'
import { join, diad, createFriendRequest, getFriends } from '@@/utils'
import { ERROR_MESSAGES } from '@uxc/common/node'
import request from 'supertest'

import { app } from '@/app'
import { seed } from '@/schema/resolvers/mutations/computed/seed'

const testSubject = 'removeFriend'
describe(`${testSubject} workflow`, () => {
  it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
    const { users } = await seed({ mode: 0 })

    const { body } = await request(app)
      .post(BASE_PATH)
      .send({
        query: REMOVE_FRIEND,
        variables: {
          friendId: users[0]._id,
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when not provided a friendId', async () => {
    const { cookie } = await join()

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: REMOVE_FRIEND,
        variables: {
          friendId: null,
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_FRIEND_ID)
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when provided a friendId that is not a valid ObjectID', async () => {
    const { cookie } = await join()
    const badFriendId = 'test'

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: REMOVE_FRIEND,
        variables: {
          friendId: badFriendId,
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      `The provided friendId ${badFriendId} is not a valid ObjectID.`,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('removes the friend relationship', async () => {
    const { cookie, cookie2, id2 } = await diad()

    const { body } = await createFriendRequest({
      cookie,
      variables: {
        recipientId: id2,
      },
    })

    await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie2)
      .send({
        query: UPDATE_FRIEND_REQUEST,
        variables: {
          requestId: body.data.createFriendRequest,
          status: 'ACCEPTED',
        },
      })
      .expect(200)

    const { body: body2 } = await getFriends({ cookie })

    const friend = body2.data.getFriends[0]

    const { body: body3 } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: REMOVE_FRIEND,
        variables: {
          friendId: friend._id,
        },
      })
      .expect(200)

    expect(body3.data.removeFriend).toBe(friend._id)
  })
})
