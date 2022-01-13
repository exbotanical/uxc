import { Channel } from '@uxc/types';

export enum MODAL_ACTION {
	SHOW = 'SHOW_MODAL',
	HIDE = 'HIDE_MODAL'
}

type ModalType = 'create' | 'edit';

interface Payload {
	type?: ModalType;
	data?: Pick<Channel, 'desc' | 'name' | 'uuid'>;
}

export interface BaseChannelAction {
	type: MODAL_ACTION;
	payload?: Payload;
}

export interface HideChannelAction extends BaseChannelAction {
	type: MODAL_ACTION.HIDE;
}

export interface ShowChannelAction extends BaseChannelAction {
	type: MODAL_ACTION.SHOW;
	payload: Payload;
}

export interface ShowModal {
	(p: Payload): ModalAction;
}

export interface HideModal {
	(): ModalAction;
}

export type ModalAction = HideChannelAction | ShowChannelAction;

export type ModalState = Payload & { showing: boolean };

export interface ChannelState {
	channelModal: ModalState;
}
