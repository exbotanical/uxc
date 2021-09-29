import { useContext } from 'react';
import { SocketContext } from '@/context';
import { wrap } from '@/services';

export const useConn = () => {
	const { conn, setUser } = useContext(SocketContext);

	return {
		conn: conn!,
		setUser
	};
};

export const useWrappedConn = () => {
	const { conn, setUser } = useContext(SocketContext);

	return {
		client: wrap(conn!),
		setUser
	};
};
