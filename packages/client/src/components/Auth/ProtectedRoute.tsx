import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { SocketContext, SessionContext } from '@/context';

export function ProtectedRoute({
	children
}: {
	isDash?: boolean;
	children: JSX.Element;
}) {
	const { conn } = useContext(SocketContext);
	const { isAuthenticated } = useContext(SessionContext);

	if (!isAuthenticated) {
		return <Navigate replace to="/" />;
	}

	if (!conn) {
		return <>Loading...</>;
	} // @TODO improve

	return <>{children}</>;
}

ProtectedRoute.displayName = 'ProtectedRoute';
