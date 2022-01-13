import { MODAL_ACTION } from './types';

import type {
	BaseChannelAction,
	HideChannelAction,
	ShowChannelAction
} from './types';

export const NAMESPACE = 'channel';

export function isHideChannelAction(
	action: BaseChannelAction
): action is HideChannelAction {
	return action.type === MODAL_ACTION.HIDE;
}

export function isShowChannelAction(
	action: BaseChannelAction
): action is ShowChannelAction {
	return action.type === MODAL_ACTION.SHOW && !!action.payload?.type;
}

export const createActionName = (name: string) => `${NAMESPACE}/${name}`;
