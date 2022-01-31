import { isHideRoomAction, isShowRoomAction } from './util';

import type { RoomState, ModalAction } from './types';

const initialState = {
	channelModal: { showing: false }
};

export function reducer(
	state: RoomState = initialState, // eslint-disable-line @typescript-eslint/default-param-last
	action: ModalAction
): RoomState {
	if (isHideRoomAction(action)) {
		return { ...state, channelModal: { showing: false } };
	}

	if (isShowRoomAction(action)) {
		return { ...state, channelModal: { showing: true, ...action.payload } };
	}

	return state;
}

// createStateSelector = ceateSelector((state) => state.thing, othergetter);
