import React from 'react';
import { Navigate } from 'react-router-dom';

import { withProtectedRoute } from './ProtectedRoute';

import { Login } from '@/components/Auth/Login';
import { ChatRoom } from '@/pages/ChatRoom';
import { Dashboard } from '@/pages/Dashboard';
import type { RouteObject } from 'react-router-dom';
import { Register } from '@/components/Auth/Register';

const WrappedDashboard = withProtectedRoute(Dashboard);
const WrappedChatRoom = withProtectedRoute(ChatRoom);

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
			element: <WrappedChatRoom />,
			path: 'thread',

			children: [
				{
					element: <WrappedChatRoom />,
					path: ':threadId'
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
