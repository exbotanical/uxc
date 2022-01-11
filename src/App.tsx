import React from 'react';
import ReacModal from 'react-modal';
import { Route, Switch } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@/context';
import { ChannelContainer } from '@/pages/Channel';
import { Dashboard } from '@/pages/Dashboard';

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
