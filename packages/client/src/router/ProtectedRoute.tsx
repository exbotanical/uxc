import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate } from 'react-router-dom';

import type { User } from '@uxc/common';

import { GET_CURRENT_USER } from '@/services/api/queries';

export function withProtectedRoute<P extends Record<string, unknown>>(
	Component: React.ComponentType<P & { user: User }>
) {
	function ProtectedRoute(props: P) {
		const { loading, data, error } = useQuery<{
			getCurrentUser: User;
		}>(GET_CURRENT_USER);

		if (loading) {
			return <>Loading...</>;
		}

		if (error || !data) {
			return <Navigate replace to="/signin" />;
		}

		return <Component {...props} user={data.getCurrentUser} />;
	}

	ProtectedRoute.displayName = 'ProtectedRoute';

	return ProtectedRoute;
}
