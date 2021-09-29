import { MODAL_ACTION } from './types';

import type { IShowModal, IHideModal } from './types';
import { store } from '..';

// Actions
const SHOW_UPSERT_CHANNEL_MODAL: IShowModal = ({ type, ...data }) => ({
	type: MODAL_ACTION.SHOW,
	payload: {
		type,
		...data
	}
});

const HIDE_UPSERT_CHANNEL_MODAL: IHideModal = () => ({
	type: MODAL_ACTION.HIDE
});

// Action Creators
export const showUpsertChannelModal: IShowModal = (args) =>
	store.dispatch(SHOW_UPSERT_CHANNEL_MODAL(args));

export const hideUpsertChannelModal: IHideModal = () =>
	store.dispatch(HIDE_UPSERT_CHANNEL_MODAL());
