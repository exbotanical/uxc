import { isHideChannelAction, isShowChannelAction } from './util';

import type { ChannelState, ModalAction } from './types';

const initialState = {
	channelModal: { showing: false }
};

export function reducer(
	state: ChannelState = initialState, // eslint-disable-line @typescript-eslint/default-param-last
	action: ModalAction
): ChannelState {
	if (isHideChannelAction(action)) {
		return { ...state, channelModal: { showing: false } };
	}

	if (isShowChannelAction(action)) {
		return { ...state, channelModal: { showing: true, ...action.payload } };
	}

	return state;
}

// createStateSelector = ceateSelector((state) => state.thing, othergetter);
