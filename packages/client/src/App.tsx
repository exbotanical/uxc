
import { Login } from '@uxc/client/components/Auth/Login';
import { ProtectedRoute } from '@uxc/client/components/Auth/ProtectedRoute';
import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@uxc/client/context';
import { ChannelContainer } from '@uxc/client/pages/Channel';
import { Dashboard } from '@uxc/client/pages/Dashboard';
import React from 'react';
import ReacModal from 'react-modal';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

ReacModal.setAppElement('#root');

// vite would need to do some extra parsing if we made this a `.ts` file,
// and so all files containing jsx will bear the extension
export function App() {
	return (
		<SessionProvider>
			<SocketProvider shouldConnect>
				<BackgroundTasksProvider>
					<Switch>
						<ProtectedRoute
							component={ChannelContainer}
							exact
							path="/channel/:id"
						/>

						<ProtectedRoute component={Dashboard} exact path="/dashboard" />

						<Route component={Login} exact path="/" />
					</Switch>
				</BackgroundTasksProvider>
			</SocketProvider>
		</SessionProvider>
	);
}
