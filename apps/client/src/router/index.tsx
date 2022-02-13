import React from 'react';
import { Navigate } from 'react-router-dom';

import { withProtectedRoute } from './ProtectedRoute';

import type { RouteObject } from 'react-router-dom';

import { Login } from '@/components/Auth/Login';
import { Register } from '@/components/Auth/Register';
import { MainLayout } from '@/components/Layout/MainLayout';

const WrappedLayout = withProtectedRoute(MainLayout);

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
			element: <WrappedLayout />,
			path: 'thread',

			children: [
				{
					element: <WrappedLayout />,
					path: ':threadId'
				}
			]
		},

		{
			element: <Navigate to="/login" />,
			path: '*'
		}
	];
}
