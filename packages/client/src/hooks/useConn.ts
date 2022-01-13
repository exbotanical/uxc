import { wrap } from '@uxc/socket-client';
import { useContext } from 'react';

import { SocketContext } from '@/context';

export function useConn() {
	const { conn, setUser } = useContext(SocketContext);

	return {
		conn,
		setUser
	};
}

export function useWrappedConn() {
	const { conn, setUser } = useContext(SocketContext);

	return {
		client: wrap(conn!),
		setUser
	};
}
