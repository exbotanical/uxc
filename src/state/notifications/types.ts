import type { ReactNode } from 'react';

export enum NOTIFICATION_ACTION {
	SHOW = 'SHOW_NOTIFICATION',
	HIDE = 'HIDE_NOTIFICATION'
}

export interface INotification {
	id: string;
	button?: ReactNode;
	duration?: TNotification;
	message: string;
	type: 'error' | 'success' | 'info';
}

export interface BaseAction {
	type: NOTIFICATION_ACTION;
}

export interface HideAction extends BaseAction {
	type: NOTIFICATION_ACTION.HIDE;
	payload: Pick<INotification, 'id'>;
}

export interface ShowAction extends BaseAction {
	type: NOTIFICATION_ACTION.SHOW;
	payload: Omit<INotification, 'id'>;
}

export interface IShowNotification {
	(p: Omit<INotification, 'id'>): INotificationAction;
}

export interface IHideNotification {
	(p: Pick<INotification, 'id'>): INotificationAction;
}

export type INotificationState = INotification[];

export type TNotification = 'default' | 'sticky';

export type INotificationAction = ShowAction | HideAction;
