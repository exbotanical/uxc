import decode from 'jwt-decode';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import type { User, UserTokens } from '@uxc/types';
import type { JwtPayload } from 'jsonwebtoken';

type AllNullable<T> = { [K in keyof T]: T[K] | null };

type SessionTokens = AllNullable<UserTokens>;

interface SessionCtx {
	userSession: SessionTokens;
	setUserSession: (tokens: SessionTokens) => void;
	isAuthenticated: boolean;
}

export const SessionContext = createContext({} as SessionCtx);

export function SessionProvider({
	children
}: {
	// TODO
	children: JSX.Element | JSX.Element[];
}) {
	// const
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({} as User);

	useEffect(() => {
		// const user = await
	}, []);

	const value = {};
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

SessionProvider.displayName = 'SessionProvider';

function defaultValue() {
	const session: SessionTokens = {
		accessToken: null,
		refreshToken: null
	};
	try {
		session.accessToken = localStorage.getItem('accessToken');
		session.refreshToken = localStorage.getItem('accessToken');
	} catch (ex) {}

	return session;
}

function isTokenLive(userSession: SessionTokens) {
	if (!!userSession.accessToken && !!userSession.refreshToken) {
		try {
			const { exp } = decode(userSession.refreshToken);

			return !!exp && Date.now() / 1000 < exp;
		} catch (ex) {}
	}

	return false;
}
