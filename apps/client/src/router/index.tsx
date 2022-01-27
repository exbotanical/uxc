import React from 'react';
import { Navigate } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import type { RouteObject } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { Channel } from '@/pages/Channel';
import { Dashboard } from '@/pages/Dashboard';

/** @todo error boundaries */
export function Routes(): RouteObject[] {
	return [
		{
			element: <Login />,
			path: '/'
		},
		{
			element: (
				<ProtectedRoute>
					<Channel />
				</ProtectedRoute>
			),
			path: '/channel/:id'
		},
		{
			element: (
				<ProtectedRoute>
					<Dashboard />
				</ProtectedRoute>
			),
			path: '/dashboard'
		},
		{
			element: <Navigate to="/" />,
			path: '*'
		}
	];
}
