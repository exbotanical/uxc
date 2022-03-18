import { isHideAction, isShowAction } from './util';

import type { State, ModalAction } from './types';

const initialState = { showing: false, data: null };

export function reducer(
	state: State = initialState, // eslint-disable-line @typescript-eslint/default-param-last
	action: ModalAction
): State {
	if (isHideAction(action)) {
		return { ...state, data: null, showing: false };
	}

	if (isShowAction(action)) {
		return { ...state, ...action.payload, showing: true };
	}

	return state;
}

// createStateSelector = ceateSelector((state) => state.thing, othergetter);
