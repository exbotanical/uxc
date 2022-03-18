import type { ReactNode } from 'react';

export enum NOTIFICATION_ACTION {
	SHOW = 'SHOW_NOTIFICATION',
	HIDE = 'HIDE_NOTIFICATION'
}

export interface Notification {
	id: string;
	button?: ReactNode;
	duration?: 'default' | 'sticky';
	message: string;
	type: 'error' | 'info' | 'success';
}

export interface BaseNotificationAction {
	type: NOTIFICATION_ACTION;
}

export interface HideNotificationAction extends BaseNotificationAction {
	type: NOTIFICATION_ACTION.HIDE;
	payload: Pick<Notification, 'id'>;
}

export interface ShowNotificationAction extends BaseNotificationAction {
	type: NOTIFICATION_ACTION.SHOW;
	payload: Omit<Notification, 'id'>;
}

export interface ShowNotification {
	(p: Omit<Notification, 'id'>): NotificationAction;
}

export interface HideNotification {
	(p: Pick<Notification, 'id'>): NotificationAction;
}

export type NotificationState = Notification[];

// export type Notification = 'default' | 'sticky';

export type NotificationAction =
	| HideNotificationAction
	| ShowNotificationAction;
