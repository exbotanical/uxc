import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import decode from 'jwt-decode';
import type { UserTokens } from '@uxc/types';
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
	const [userSession, _setUserSession] = useState(defaultValue);

	const setUserSession = (
		{ accessToken, refreshToken }: SessionTokens = {
			accessToken: null,
			refreshToken: null
		}
	) => {
		if (!isTokenLive({ accessToken, refreshToken })) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		} else {
			localStorage.setItem('accessToken', accessToken!);
			localStorage.setItem('refreshToken', refreshToken!);
		}

		_setUserSession({
			accessToken,
			refreshToken
		});
	};

	const isAuthenticated = isTokenLive(userSession);
	useEffect(() => {
		const manageStorageAdapter = () => {
			if (!isTokenLive(userSession)) {
				setUserSession();

				return <Navigate to="/" />;
			}
		};

		window.addEventListener('storage', manageStorageAdapter);

		return () => {
			window.removeEventListener('storage', manageStorageAdapter);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const value = useMemo(
		() => ({
			isAuthenticated,
			setUserSession,
			userSession
		}),
		[userSession]
	);

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
	if (!!userSession?.accessToken && !!userSession?.refreshToken) {
		try {
			const { exp } = decode(userSession.refreshToken) as JwtPayload;

			return !!exp && Date.now() / 1000 < exp;
		} catch (ex) {}
	}

	return false;
}
