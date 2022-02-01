import { isHideAction, isShowAction } from './util';

import type { State, ModalAction } from './types';

const initialState = { showing: false, data: null };

export function reducer(
	state: State = initialState, // eslint-disable-line @typescript-eslint/default-param-last
	action: ModalAction
): State {
	if (isHideAction(action)) {
		return { ...state, showing: false, data: null };
	}

	if (isShowAction(action)) {
		return { ...state, showing: true, ...action.payload };
	}

	return state;
}

// createStateSelector = ceateSelector((state) => state.thing, othergetter);
