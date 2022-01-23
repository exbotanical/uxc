import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { SessionContext } from '@/context';

export function ProtectedRoute({
	children
}: {
	isDash?: boolean;
	children: JSX.Element;
}) {
	const { isAuthenticated } = useContext(SessionContext);

	if (!isAuthenticated) {
		return <Navigate replace to="/" />;
	}

	return children;
}

ProtectedRoute.displayName = 'ProtectedRoute';
