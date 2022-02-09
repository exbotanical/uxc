import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate } from 'react-router-dom';

import type { User } from '@uxc/types';

import { GET_USER } from '@/services/api/queries';


export function withProtectedRoute<P extends {}>(
	Component: React.ComponentType<P & { user: User }>
) {
	return function (props: P) {
		const { loading, data, error } = useQuery<{
			getCurrentUser: User;
		}>(GET_USER);

		if (loading) {
			return <>Loading...</>;
		}

		if (error || !data) {
			return <Navigate replace to="/login" />;
		}

		return <Component {...props} user={data.getCurrentUser} />;
	};
}

withProtectedRoute.displayName = 'ProtectedRoute';
