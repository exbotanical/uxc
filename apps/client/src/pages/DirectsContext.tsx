import React, { createContext, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DIRECTS, GET_USER } from '@/services/api/queries';
import type { DirectRoom, ObjectID, User } from '@uxc/types';

interface DirectsContext {
	directs: DirectRoom[];
	// setDirects: (directs: DirectRoom[]) => void;
	getDirectById: (directId: ObjectID) => DirectRoom | null;
}
export const DirectsContext = createContext({} as DirectsContext);

export const DirectsProvider = ({ children }: { children: JSX.Element }) => {
	// const [directs, setDirects] = useState([] as DirectRoom[]);
	const { data: user } = useQuery<{
		getUser: User;
	}>(GET_USER);

	const { data: directsPayload } = useQuery<{ getDirects: DirectRoom[] }>(
		GET_DIRECTS,
		{
			variables: {
				userId: user?.getUser._id
			}
		}
	);

	const directs = directsPayload?.getDirects || [];

	const getDirectById = useCallback(
		(id: ObjectID) => {
			const direct = directs.find(({ _id }) => _id === id);

			return direct as DirectRoom;
		},
		[directs]
	);

	const value = { directs, getDirectById };

	return (
		<DirectsContext.Provider value={value}>{children}</DirectsContext.Provider>
	);
};
