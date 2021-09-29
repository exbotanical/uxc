import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactModal from 'react-modal';

import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@/context';

import { Login } from '@/components/auth/Login';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ChannelContainer } from '@/pages/Channel';
import { Dashboard } from '@/pages/Dashboard';

import './App.scss';

ReactModal.setAppElement('#root');

// vite would need to do some extra parsing if we made this a `.ts` file,
// and so all files containing jsx will bear the extension
export const App = () => {
	return (
		<SessionProvider>
			<SocketProvider shouldConnect={true}>
				<BackgroundTasksProvider>
					<Switch>
						<ProtectedRoute
							exact
							path="/channel/:id"
							component={ChannelContainer}
						/>
						<ProtectedRoute exact path="/dashboard" component={Dashboard} />
						<Route exact path="/" component={Login} />
					</Switch>
				</BackgroundTasksProvider>
			</SocketProvider>
		</SessionProvider>
	);
};
