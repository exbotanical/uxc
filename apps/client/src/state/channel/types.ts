import { Room } from '@uxc/types';

export enum MODAL_ACTION {
	SHOW = 'SHOW_MODAL',
	HIDE = 'HIDE_MODAL'
}

type ModalType = 'create' | 'edit';

interface Payload {
	type?: ModalType;
	data?: Pick<Room, 'desc' | 'name' | 'id'>;
}

export interface BaseRoomAction {
	type: MODAL_ACTION;
	payload?: Payload;
}

export interface HideRoomAction extends BaseRoomAction {
	type: MODAL_ACTION.HIDE;
}

export interface ShowRoomAction extends BaseRoomAction {
	type: MODAL_ACTION.SHOW;
	payload: Payload;
}

export interface ShowModal {
	(p: Payload): ModalAction;
}

export interface HideModal {
	(): ModalAction;
}

export type ModalAction = HideRoomAction | ShowRoomAction;

export type ModalState = Payload & { showing: boolean };

export interface RoomState {
	channelModal: ModalState;
}
