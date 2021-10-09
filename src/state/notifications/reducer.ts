import { v4 as generateUuid } from 'uuid';
import { isHideAction, isShowAction } from './util';

import type { INotificationState, INotificationAction } from './types';

export function reducer (
	state: INotificationState = [],
	action: INotificationAction
) {
	if (isHideAction(action)) {
		return [...state.filter(({ id }) => id != action.payload.id)];
	}

	if (isShowAction(action)) {
		return [...state, { ...action.payload, id: generateUuid() }];
	}

	return state;
}
