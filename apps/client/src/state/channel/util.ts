import { MODAL_ACTION } from './types';

import type { BaseRoomAction, HideRoomAction, ShowRoomAction } from './types';

export const NAMESPACE = 'channel';

export function isHideRoomAction(
	action: BaseRoomAction
): action is HideRoomAction {
	return action.type === MODAL_ACTION.HIDE;
}

export function isShowRoomAction(
	action: BaseRoomAction
): action is ShowRoomAction {
	return action.type === MODAL_ACTION.SHOW && !!action.payload?.type;
}

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
