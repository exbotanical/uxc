import { useContext, useEffect } from 'react';

import { SocketContext } from '.';

export function useBackgroundTasks() {
	const { conn } = useContext(SocketContext)!;

	useEffect(() => {
		if (!conn) return;

		const unsubscribables = [
			conn.subscribe('error', (message: string) => {
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
}

export function BackgroundTasksProvider({
	children
}: {
	children: JSX.Element;
}) {
	useBackgroundTasks();

	return children;
}

BackgroundTasksProvider.displayName = 'BackgroundTasksProvider';