import { v4 as generateId } from 'uuid'

import { isHideNotificationAction, isShowNotificationAction } from './util'

import type { NotificationState, NotificationAction } from './types'

export function reducer(
  state: NotificationState = [], // eslint-disable-line @typescript-eslint/default-param-last
  action: NotificationAction,
) {
  if (isHideNotificationAction(action)) {
    return [...state.filter(({ id }) => id != action.payload.id)]
  }

  if (isShowNotificationAction(action)) {
    return [...state, { ...action.payload, id: generateId() }]
  }

  return state
}
