import { SocketContext } from '@uxc/client/context';
import { wrap } from '@uxc/client/services';
import { useContext } from 'react';

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
		client: wrap(conn),
		setUser
	};
}
