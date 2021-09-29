import { combineReducers, createStore } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { reducer as notification } from './notifications/reducer';
import { showNotification, hideNotification } from './notifications/actions';

import { reducer as channel } from './channel/reducer';
import {
	showUpsertChannelModal,
	hideUpsertChannelModal
} from './channel/actions';

export type RootState = ReturnType<typeof store.getState>;

// state
const store = createStore(
	combineReducers({ notification, channel }),
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// selectors
// TODO

// state helpers
const mapStateToProps = (state: RootState) => {
	return {
		notifications: state.notification,
		channelModalState: state.channel.channelModal
	};
};

const mapDispatchToProps = {
	showNotification,
	hideNotification,
	showUpsertChannelModal,
	hideUpsertChannelModal
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export {
	store,
	connector,
	showNotification,
	hideNotification,
	showUpsertChannelModal,
	hideUpsertChannelModal
};

export type PropsFromRedux = ConnectedProps<typeof connector>;
