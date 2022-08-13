import type { ObjectID } from '@uxc/common'

export enum MODAL_ACTION {
  SHOW = 'SHOW_MODAL',
  HIDE = 'HIDE_MODAL',
}

type ModalType = 'create' | 'edit'

interface Payload {
  type?: ModalType
  data: ObjectID | null
}

export interface BaseAction {
  type: MODAL_ACTION
  payload?: Payload
}

export interface HideAction extends BaseAction {
  type: MODAL_ACTION.HIDE
}

export interface ShowAction extends BaseAction {
  type: MODAL_ACTION.SHOW
  payload: Payload
}

export interface ShowModal {
  (p: Payload): ModalAction
}

export interface HideModal {
  (): ModalAction
}

export type ModalAction = HideAction | ShowAction

export type State = Payload & { showing: boolean }
