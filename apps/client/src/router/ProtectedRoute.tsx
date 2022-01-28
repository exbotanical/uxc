import React from 'react';
import { Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_USER } from '@/services/api/queries';
import type { User } from '@uxc/types';

interface GetUserPayload {
	getUser: User;
}

export function withProtectedRoute<P extends {}>(
	Component: React.ComponentType<P & { user: User }>
) {
	return function (props: P) {
		const { loading, data, error } = useQuery<GetUserPayload>(GET_USER);

		if (loading) {
			return <>Loading...</>;
		}

		if (error || !data) {
			return <Navigate replace to="/" />;
		}

		return <Component {...props} user={data.getUser} />;
	};
}

// export function ProtectedRoute({
// 	children
// }: {
// 	isDash?: boolean;
// 	children: JSX.Element;
// }) {
// 	const { loading, data, error } = useQuery<GetUserPayload>(GET_USER);

// 	if (loading) {
// 		return <>Loading...</>;
// 	}

// 	if (error || !data) {
// 		return <Navigate replace to="/" />;
// 	}

// 	return React.cloneElement(children, { user: data.getUser });
// }

// ProtectedRoute.displayName = 'ProtectedRoute';
