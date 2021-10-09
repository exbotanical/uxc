import { isHideAction, isShowAction } from './util';

import type { IChannelState, IModalAction } from './types';

const initialState = {
	channelModal: { showing: false }
};

export function reducer (
	state: IChannelState = initialState,
	action: IModalAction
): IChannelState {
	if (isHideAction(action)) {
		return { ...state, channelModal: { showing: false } };
	}

	if (isShowAction(action)) {
		return { ...state, channelModal: { showing: true, ...action.payload } };
	}

	return state;
}

// createStateSelector = ceateSelector((state) => state.thing, othergetter);
