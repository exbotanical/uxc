import { NOTIFICATION_ACTION } from './types';

import type { BaseAction, HideAction, ShowAction } from './types';

export const NAMESPACE = 'notifications';

// we'll use type guards to 'teach' TypeScript our action types
export function isHideAction(action: BaseAction): action is HideAction {
	return action.type === NOTIFICATION_ACTION.HIDE;
}

export function isShowAction(action: BaseAction): action is ShowAction {
	return action.type === NOTIFICATION_ACTION.SHOW;
}

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
