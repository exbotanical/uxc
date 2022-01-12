import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import type { JWT } from '@/types/const';

function defaultValue() {
	try {
		return localStorage.getItem('accessToken') || '';
	} catch (ex) {
		return '';
	}
}

interface SessionCtx {
	userSession: JWT;
	setUserSession: (accessToken: JWT | null) => void;
	isAuthenticated: boolean;
}

export const SessionContext = createContext({} as SessionCtx);

export function SessionProvider({
	children
}: {
	// TODO
	children: JSX.Element | JSX.Element[];
}) {
	const history = useHistory();
	const [userSession, _setUserSession] = useState(defaultValue);

	const setUserSession = (accessToken: JWT | null) => {
		if (!accessToken) {
			localStorage.removeItem('accessToken');
			_setUserSession('');
		} else {
			localStorage.setItem('accessToken', accessToken);
			_setUserSession(accessToken);
		}
	};

	useEffect(() => {
		const manageStorageAdapter = () => {
			if (!defaultValue()) {
				setUserSession(null);
				history.replace('/');
			}
		};

		window.addEventListener('storage', manageStorageAdapter);

		return () => {
			window.removeEventListener('storage', manageStorageAdapter);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const value = useMemo(
		() => ({
			isAuthenticated: !!userSession,
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
