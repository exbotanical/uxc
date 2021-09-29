import React, { useContext, useEffect } from 'react';

import type { FC } from 'react';

import { SocketContext } from '.';

export const useBackgroundTasks = () => {
	const { conn } = useContext(SocketContext);

	useEffect(() => {
		if (!conn) return;

		const unsubscribables = [
			conn.subscribe<any>('error', (message) => {
				// dispatchErrorToast(message);
				console.error({ message });
			})
		];

		return () => {
			unsubscribables.forEach((u) => u());
		};
	}, [conn]);

	return conn;
};

export const BackgroundTasksProvider: FC = ({ children }) => {
	useBackgroundTasks();

	return <>{children}</>;
};

BackgroundTasksProvider.displayName = 'BackgroundTasksProvider';
