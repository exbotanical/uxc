import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@/context';

import React from 'react';
import ReactModal from 'react-modal';
import { useRoutes } from 'react-router-dom';
import './App.scss';
import { AnimatePresence } from 'framer-motion';

import { Routes } from './router';
ReactModal.setAppElement('#root');

export function App() {
	return (
		<SessionProvider>
			<SocketProvider shouldConnect>
				<BackgroundTasksProvider>
					<AnimatePresence exitBeforeEnter initial={false}>
						<>{useRoutes(Routes())}</>
					</AnimatePresence>
				</BackgroundTasksProvider>
			</SocketProvider>
		</SessionProvider>
	);
}
