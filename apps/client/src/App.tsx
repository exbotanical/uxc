import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ReactModal from 'react-modal';
import { useRoutes } from 'react-router-dom';

import { Routes } from '@/router';
import { client } from '@/services/api';
import './App.scss';
import { ThemeProvider } from '@/styles';

import { HelmetProvider } from 'react-helmet-async';

ReactModal.setAppElement('#root');

export function App() {
	return (
		<HelmetProvider>
			<ApolloProvider client={client}>
				<AnimatePresence exitBeforeEnter initial={false}>
					<ThemeProvider>
						<>{useRoutes(Routes())}</>
					</ThemeProvider>
				</AnimatePresence>
			</ApolloProvider>
		</HelmetProvider>
	);
}
