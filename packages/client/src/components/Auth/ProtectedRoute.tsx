import { SocketContext, SessionContext } from '@/context';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({
	children
}: {
	isDash?: boolean;
	children: JSX.Element;
}) {
	const { conn } = useContext(SocketContext);
	const { isAuthenticated } = useContext(SessionContext);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	if (!conn) {
		return <>Loading...</>;
	} // @TODO improve

	return <>{children}</>;
}

ProtectedRoute.displayName = 'ProtectedRoute';
