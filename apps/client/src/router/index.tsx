import React from 'react';
import { Navigate } from 'react-router-dom';

import { withProtectedRoute } from './ProtectedRoute';

import { Login } from '@/components/Auth/Login';
import { Room } from '@/pages/Room';
import { Dashboard } from '@/pages/Dashboard';
import type { RouteObject } from 'react-router-dom';
import { Register } from '@/components/Auth/Register';

const WrappedDashboard = withProtectedRoute(Dashboard);
const WrappedRoom = withProtectedRoute(Room);

/** @todo error boundaries */
export function Routes(): RouteObject[] {
	return [
		{
			element: <Login />,
			path: '/login'
		},
		{
			element: <Register />,
			path: '/register'
		},
		{
			element: <WrappedRoom />,
			path: 'room',

			children: [
				{
					element: <WrappedRoom />,
					path: ':roomId'
				}
			]
		},
		{
			element: <WrappedDashboard />,
			path: '/dashboard'
		},
		{
			element: <Navigate to="/login" />,
			path: '*'
		}
	];
}
