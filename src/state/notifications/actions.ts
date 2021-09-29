import {
	IShowNotification,
	IHideNotification,
	NOTIFICATION_ACTION
} from './types';
import { store } from '..';

// Actions
const SHOW_NOTIFICATION: IShowNotification = ({
	message,
	duration = 'default',
	type = 'info'
}) => ({
	type: NOTIFICATION_ACTION.SHOW,
	payload: {
		message,
		duration,
		type
	}
});

const HIDE_NOTIFICATION: IHideNotification = ({ id }) => ({
	type: NOTIFICATION_ACTION.HIDE,
	payload: {
		id
	}
});

// Action Creators
export const showNotification: IShowNotification = (args) =>
	store.dispatch(SHOW_NOTIFICATION(args));

export const hideNotification: IHideNotification = (args) =>
	store.dispatch(HIDE_NOTIFICATION(args));
