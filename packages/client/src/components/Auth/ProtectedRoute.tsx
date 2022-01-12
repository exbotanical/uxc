import { SocketContext, SessionContext } from '@uxc/client/context';
import { WithLayout } from '@uxc/client/pages/WithLayout';
import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


export function ProtectedRoute({ ...props }: RouteProps) {
	const { conn } = useContext(SocketContext);
	const { isAuthenticated } = useContext(SessionContext);

	if (!isAuthenticated) {
		return <Redirect to="/" />;
	}

	if (!conn) {
		return <>Loading...</>;
	} // TODO improve

	const isDash = props.location.pathname == '/dashboard';
	return (
		<WithLayout isDash={isDash}>
			<Route {...props} />
		</WithLayout>
	);
}

ProtectedRoute.displayName = 'ProtectedRoute';
