import { connect } from '@uxc/socket-client';
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import type { Connection } from '@uxc/socket-client/src/types';
import type { User } from '@uxc/types';

// import { SessionContext } from '@/context';
import { showNotification } from '@/state';

interface SocketProviderProps {
	shouldConnect: boolean;
}

export interface UserSetter {
	(user: User): User;
}

interface SocketCtx {
	conn: Connection | null;
	setConn: (c: Connection | null) => void;
	setUser: (args: User | UserSetter) => void;
}

export const SocketContext = createContext<SocketCtx>({
	conn: null,
	setConn: () => {},
	setUser: () => {}
});

export function SocketProvider({
	shouldConnect,
	children
}: // TODO
SocketProviderProps & { children: JSX.Element | JSX.Element[] }) {
	const [conn, setConn] = useState<Connection | null>(null);
	const isConnecting = useRef(false);

	// useEffect(() => {
	// 	if (!conn && shouldConnect && isAuthenticated && !isConnecting.current) {
	// 		isConnecting.current = true;

	// 		connect({
	// 			getAuthOptions: () => ({
	// 				accessToken: userSession
	// 			}),
	// 			logger: console.log, // eslint-disable-line no-console
	// 			onError: (message) =>
	// 				showNotification({
	// 					message,
	// 					type: 'error'
	// 				}),
	// 			shouldReconnect: true,
	// 			url: 'ws://localhost:5000/',
	// 			waitTimeout: 9000
	// 		})
	// 			.then(setConn)
	// 			.catch((err: { code: number }) => {
	// 				console.error({ err });

	// 				if (err.code === 4001) {
	// 					console.error("we're fucked");
	// 				}
	// 			})
	// 			.finally(() => {
	// 				isConnecting.current = false;
	// 			});
	// 	}
	// }, [conn, shouldConnect, isAuthenticated, userSession]);

	useEffect(() => {
		if (!conn) {
			return;
		}

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
			setUser(user: User | UserSetter) {
				if (conn) {
					if (typeof user === 'function') {
						setConn({
							...conn,
							user: user(conn.user)
						});
					} else {
						setConn({
							...conn,
							user
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
}

SocketProvider.displayName = 'SocketProvider';
