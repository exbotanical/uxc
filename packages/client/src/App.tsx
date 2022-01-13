import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@/context';
import React from 'react';
import ReactModal from 'react-modal';
import { useRoutes } from 'react-router-dom';
import './App.scss';

import { Routes } from './router';
ReactModal.setAppElement('#root');

export function App() {
	return (
		<SessionProvider>
			<SocketProvider shouldConnect>
				<BackgroundTasksProvider>
					<>{useRoutes(Routes())}</>
				</BackgroundTasksProvider>
			</SocketProvider>
		</SessionProvider>
	);
}
