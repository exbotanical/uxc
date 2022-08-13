import { CANCEL_FRIEND_REQUEST } from '@@/fixtures'
import { join, createFriendRequest, signin } from '@@/utils'
import { ERROR_MESSAGES } from '@uxc/common/node'
import request from 'supertest'

import { app } from '@/app'
import { seed } from '@/schema/resolvers/mutations/computed/seed'

const testSubject = 'cancelFriendRequest'
describe(`${testSubject} workflow`, () => {
  it('fails with an Unauthorized error if the request does not include a valid session cookie', async () => {
    const { users } = await seed({ mode: 0 })

    const { body } = await request(app)
      .post(BASE_PATH)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: {
          recipientId: users[0]._id,
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      ERROR_MESSAGES.E_AUTHORIZATION_REQUIRED,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when not provided a requestId', async () => {
    const { cookie } = await join()

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: { requestId: null },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(ERROR_MESSAGES.E_NO_REQUEST_ID)
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when provided a requestId that is not a valid ObjectID', async () => {
    const { cookie } = await join()
    const badrequestId = 'test'

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: {
          requestId: badrequestId,
        },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      `The provided requestId ${badrequestId} is not a valid ObjectID.`,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when provided a requestId that does not exist in the database', async () => {
    const { threadIds } = await seed({ mode: 0 })

    const { cookie } = await join()
    const threadId = threadIds[0]

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: { requestId: threadId },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      `The provided requestId ${threadId} does not represent a resource in the database.`,
    )
    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('fails when the user attempts to cancel a friend request sent by another user', async () => {
    const { user, users } = await seed()
    const cookie = (await signin(user)).get('Set-Cookie')

    const response = await createFriendRequest({
      cookie,
      variables: {
        recipientId: users[0]._id,
      },
    })

    const requestId = response.body.data.createFriendRequest
    const cookie2 = (await signin(users[0])).get('Set-Cookie')

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie2)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: { requestId },
      })
      .expect(200)

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].message).toStrictEqual(
      ERROR_MESSAGES.E_NO_OTHER_REQUEST_CANCEL,
    )

    expect(body.errors[0].path[0]).toBe(testSubject)
  })

  it('cancels a friend request', async () => {
    const { user, users } = await seed()
    const cookie = (await signin(user)).get('Set-Cookie')

    const response = await createFriendRequest({
      cookie,
      variables: {
        recipientId: users[0]._id,
      },
    })

    const requestId = response.body.data.createFriendRequest

    const { body } = await request(app)
      .post(BASE_PATH)
      .set('Cookie', cookie)
      .send({
        query: CANCEL_FRIEND_REQUEST,
        variables: { requestId },
      })
      .expect(200)

    expect(body.data.cancelFriendRequest).toStrictEqual(expect.any(String))
  })
})
