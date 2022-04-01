import { store } from '..';

import { NOTIFICATION_ACTION } from './types';

import type { ShowNotification, HideNotification } from './types';

const SHOW_NOTIFICATION: ShowNotification = ({
	message,
	duration = 'default',
	type = 'info'
}) => ({
	payload: {
		duration,
		message,
		type
	},
	type: NOTIFICATION_ACTION.SHOW
});

const HIDE_NOTIFICATION: HideNotification = ({ id }) => ({
	payload: {
		id
	},
	type: NOTIFICATION_ACTION.HIDE
});

export const showNotification: ShowNotification = (args) =>
	store.dispatch(SHOW_NOTIFICATION(args));

export const hideNotification: HideNotification = (args) =>
	store.dispatch(HIDE_NOTIFICATION(args));
