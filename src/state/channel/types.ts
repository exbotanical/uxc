import { IChannel } from '@/types/channel';

export enum MODAL_ACTION {
	SHOW = 'SHOW_MODAL',
	HIDE = 'HIDE_MODAL'
}

type TModalType = 'create' | 'edit';

type TPayload = {
	type?: TModalType;
	data?: Pick<IChannel, 'name' | 'desc' | 'uuid'>;
};

export interface BaseAction {
	type: MODAL_ACTION;
	payload?: TPayload;
}

export interface HideAction extends BaseAction {
	type: MODAL_ACTION.HIDE;
}

export interface ShowAction extends BaseAction {
	type: MODAL_ACTION.SHOW;
	payload: TPayload;
}

export interface IShowModal {
	(p: TPayload): IModalAction;
}

export interface IHideModal {
	(): IModalAction;
}

export type IModalAction = ShowAction | HideAction;

export type IModalState = { showing: boolean } & TPayload;

export type IChannelState = { channelModal: IModalState };
