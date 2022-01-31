import React from 'react';
import { Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_USER } from '@/services/api/queries';
import type { User } from '@uxc/types';

export function withProtectedRoute<P extends {}>(
	Component: React.ComponentType<P & { user: User }>
) {
	return function (props: P) {
		const { loading, data, error } = useQuery<{
			getUser: User;
		}>(GET_USER);

		if (loading) {
			return <>Loading...</>;
		}

		if (error || !data) {
			return <Navigate replace to="/login" />;
		}

		return <Component {...props} user={data.getUser} />;
	};
}

withProtectedRoute.displayName = 'ProtectedRoute';
