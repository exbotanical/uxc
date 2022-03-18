import { MODAL_ACTION } from './types';

import type { BaseAction, HideAction, ShowAction } from './types';

export const NAMESPACE = 'channel';

export function isHideAction(action: BaseAction): action is HideAction {
	return action.type === MODAL_ACTION.HIDE;
}

export function isShowAction(action: BaseAction): action is ShowAction {
	return action.type === MODAL_ACTION.SHOW && !!action.payload?.type;
}

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
