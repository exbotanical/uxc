import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import type { FC } from 'react';

import type { JWT } from '@/types/const';

function defaultValue () {
	try {
		return localStorage.getItem('accessToken') || '';
	} catch (ex) {
		return '';
	}
}

interface ISessionContext {
	userSession: JWT;
	setUserSession: (accessToken: JWT | null) => void;
	isAuthenticated: boolean;
}

export const SessionContext = createContext({} as ISessionContext);

export const SessionProvider: FC = ({ children }) => {
	const { replace } = useHistory();
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
				replace('/');
			}
		};

		window.addEventListener('storage', manageStorageAdapter);

		return () => window.removeEventListener('storage', manageStorageAdapter);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const value = {
		userSession,
		setUserSession,
		isAuthenticated: !!userSession
	};

	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
};

SessionProvider.displayName = 'SessionProvider';
