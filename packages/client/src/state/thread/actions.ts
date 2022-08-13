import { store } from '..'

import { MODAL_ACTION } from './types'

import type { ShowModal, HideModal } from './types'

const SHOW_UPSERT_THREAD_MODAL: ShowModal = ({ type, ...data }) => ({
  payload: {
    type,
    ...data,
  },
  type: MODAL_ACTION.SHOW,
})

const HIDE_UPSERT_THREAD_MODAL: HideModal = () => ({
  type: MODAL_ACTION.HIDE,
})

export const showUpsertThreadModal: ShowModal = args =>
  store.dispatch(SHOW_UPSERT_THREAD_MODAL(args))

export const hideUpsertThreadModal: HideModal = () =>
  store.dispatch(HIDE_UPSERT_THREAD_MODAL())
