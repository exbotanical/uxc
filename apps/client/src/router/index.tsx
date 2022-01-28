import React from 'react';
import { Navigate } from 'react-router-dom';

import { withProtectedRoute } from './ProtectedRoute';

import { Login } from '@/components/Auth/Login';
import { Channel } from '@/pages/Channel';
import { Dashboard } from '@/pages/Dashboard';
import type { RouteObject } from 'react-router-dom';

const WrappedDashboard = withProtectedRoute(Dashboard);
const WrappedChannel = withProtectedRoute(Channel);

/** @todo error boundaries */
export function Routes(): RouteObject[] {
	return [
		{
			element: <Login />,
			path: '/'
		},
		{
			element: <WrappedChannel />,
			path: '/channel/:id'
		},
		{
			element: <WrappedDashboard />,
			path: '/dashboard'
		},
		{
			element: <Navigate to="/" />,
			path: '*'
		}
	];
}
