import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import type { FC } from 'react';

import { SocketContext, SessionContext } from '@/context';
import { WithLayout } from '@/pages/WithLayout';

export const ProtectedRoute: FC<RouteProps> = ({ ...props }) => {
	const { conn } = useContext(SocketContext);
	const { isAuthenticated } = useContext(SessionContext);

	if (!isAuthenticated) return <Redirect to="/" />;

	if (!conn) return <>Loading...</>; // TODO improve

	const isDash = props.location?.pathname == '/dashboard';
	return (
		<WithLayout isDash={isDash}>
			<Route {...props} />
		</WithLayout>
	);
};

ProtectedRoute.displayName = 'ProtectedRoute';
