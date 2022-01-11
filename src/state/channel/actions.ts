import { store } from '..';

import { MODAL_ACTION } from './types';

import type { ShowModal, HideModal } from './types';

// Actions
const SHOW_UPSERT_CHANNEL_MODAL: ShowModal = ({ type, ...data }) => ({
	payload: {
		type,
		...data
	},
	type: MODAL_ACTION.SHOW
});

const HIDE_UPSERT_CHANNEL_MODAL: HideModal = () => ({
	type: MODAL_ACTION.HIDE
});

// Action Creators
export const showUpsertChannelModal: ShowModal = (args) =>
	store.dispatch(SHOW_UPSERT_CHANNEL_MODAL(args));

export const hideUpsertChannelModal: HideModal = () =>
	store.dispatch(HIDE_UPSERT_CHANNEL_MODAL());
