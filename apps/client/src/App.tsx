import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ReactModal from 'react-modal';
import { useRoutes } from 'react-router-dom';

import { Routes } from '@/router';
import { client } from '@/services/api';
import './App.scss';
import { ThemeProvider } from './theme';

ReactModal.setAppElement('#root');

export function App() {
	return (
		<ApolloProvider client={client}>
			<AnimatePresence exitBeforeEnter initial={false}>
				<ThemeProvider>
					<>{useRoutes(Routes())}</>
				</ThemeProvider>
			</AnimatePresence>
		</ApolloProvider>
	);
}
