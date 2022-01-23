import React from 'react';
import ReactModal from 'react-modal';
import { useRoutes } from 'react-router-dom';

import {
	SessionProvider,
	BackgroundTasksProvider,
	SocketProvider
} from '@/context';

import './App.scss';
import { AnimatePresence } from 'framer-motion';

import { Routes } from '@/router';

import { ApolloProvider } from '@apollo/client';

import { client } from '@/services/api';
ReactModal.setAppElement('#root');

export function App() {
	return (
		<ApolloProvider client={client}>
			<SessionProvider>
				<SocketProvider shouldConnect>
					<BackgroundTasksProvider>
						<AnimatePresence exitBeforeEnter initial={false}>
							<>{useRoutes(Routes())}</>
						</AnimatePresence>
					</BackgroundTasksProvider>
				</SocketProvider>
			</SessionProvider>
		</ApolloProvider>
	);
}
