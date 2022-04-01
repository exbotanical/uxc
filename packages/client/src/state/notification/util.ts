import { NOTIFICATION_ACTION } from './types';

import type {
	BaseNotificationAction,
	HideNotificationAction,
	ShowNotificationAction
} from './types';

export const NAMESPACE = 'notifications';

// we'll use type guards to 'teach' TypeScript our action types
export function isHideNotificationAction(
	action: BaseNotificationAction
): action is HideNotificationAction {
	return action.type === NOTIFICATION_ACTION.HIDE;
}

export function isShowNotificationAction(
	action: BaseNotificationAction
): action is ShowNotificationAction {
	return action.type === NOTIFICATION_ACTION.SHOW;
}

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
