import React from 'react';
import { Navigate } from 'react-router-dom';

import { withProtectedRoute } from './ProtectedRoute';

import type { RouteObject } from 'react-router-dom';

import { Signin } from '@/components/Auth/Signin';
import { Join } from '@/components/Auth/Join';
import { MainLayout } from '@/components/Layout/MainLayout';

const WrappedLayout = withProtectedRoute(MainLayout);

/** @todo error boundaries */
export function Routes(): RouteObject[] {
	return [
		{
			element: <Signin />,
			path: '/signin'
		},
		{
			element: <Join />,
			path: '/join'
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
			element: <Navigate to="/signin" />,
			path: '*'
		}
	];
}
