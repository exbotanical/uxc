import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import type { FC } from 'react';

import { SessionContext } from '@/context';
import { connect } from '@/services/ws/core';
import { showNotification } from '@/state';

import type { IConnection } from '@/services/ws/core';
import type { IUser } from '@/types/user';

interface ISocketProviderProps {
	shouldConnect: boolean;
}

interface IUserSetter {
	(user: IUser): IUser;
}

interface ISocketContext {
	conn: IConnection | null;
	setConn: (c: IConnection | null) => void;
	setUser: (args: IUser | IUserSetter) => void;
}

export const SocketContext = createContext<ISocketContext>({
	conn: null,
	setConn: () => {},
	setUser: () => {}
});

export const SocketProvider: FC<ISocketProviderProps> = ({
	shouldConnect,
	children
}) => {
	const { userSession, isAuthenticated } = useContext(SessionContext);
	const [conn, setConn] = useState<IConnection | null>(null);
	const isConnecting = useRef(false);

	useEffect(() => {
		if (!conn && shouldConnect && isAuthenticated && !isConnecting.current) {
			isConnecting.current = true;

			connect({
				shouldReconnect: true,
				waitTimeout: 9000,
				url: 'ws://localhost:5000/',
				logger: console.log, // eslint-disable-line no-console
				getAuthOptions: () => ({
					accessToken: userSession
				}),
				onError: (message) =>
					showNotification({
						type: 'error',
						message
					})
			})
				.then(setConn)
				.catch((err) => {
					console.error({ err });
					if (err.code === 4001) {
						console.error('we\'re fucked');
					}
				})
				.finally(() => {
					isConnecting.current = false;
				});
		}
	}, [conn, shouldConnect, isAuthenticated, userSession]);

	useEffect(() => {
		if (!conn) return;

		return conn.subscribe<{
			refreshToken: string;
			accessToken: string;
		}>('renew', console.log); // eslint-disable-line no-console
	}, [conn]);

	const value = useMemo(
		() => ({
			conn,
			setConn,
			// `args` here is either a new user object or a setter function
			// that pulls in the current user and returns a diffed, new user
			setUser (args: IUser | IUserSetter) {
				if (conn) {
					if (typeof args === 'function') {
						setConn({
							...conn,
							user: args(conn.user)
						});
					} else {
						setConn({
							...conn,
							user: args
						});
					}
				}
			}
		}),
		[conn]
	);

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

SocketProvider.displayName = 'SocketProvider';
