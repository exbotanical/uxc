import { connect, ConnectedProps } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import {
	showUpsertChannelModal,
	hideUpsertChannelModal
} from './channel/actions';
import { reducer as channel } from './channel/reducer';
import { showNotification, hideNotification } from './notifications/actions';
import { reducer as notification } from './notifications/reducer';

export type RootState = ReturnType<typeof store.getState>;

const store = createStore(
	combineReducers({
		channel,
		notification
	}),
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// @todo selectors

const mapStateToProps = (state: RootState) => {
	return {
		channelModalState: state.channel.channelModal,
		notifications: state.notification
	};
};

const mapDispatchToProps = {
	hideNotification,
	hideUpsertChannelModal,
	showNotification,
	showUpsertChannelModal
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export {
	connector,
	hideNotification,
	hideUpsertChannelModal,
	showNotification,
	showUpsertChannelModal,
	store
};

export type PropsFromRedux = ConnectedProps<typeof connector>;
