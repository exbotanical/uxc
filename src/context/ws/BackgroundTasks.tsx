import React, { useContext, useEffect } from 'react';

import { SocketContext } from '.';

export const useBackgroundTasks = () => {
	const { conn } = useContext(SocketContext);

	useEffect(() => {
		if (!conn) return;

		const unsubscribables = [
			conn.subscribe<any>('error', (message: string) => {
				// dispatchErrorToast(message);
				console.error({ message });
			})
		];

		return () => {
			unsubscribables.forEach((u) => {
				u();
			});
		};
	}, [conn]);

	return conn;
};

export function BackgroundTasksProvider({
	children
}: {
	children: JSX.Element | JSX.Element[];
}) {
	useBackgroundTasks();

	return <>{children}</>;
}

BackgroundTasksProvider.displayName = 'BackgroundTasksProvider';
