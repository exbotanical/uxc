import React from 'react';
import { SearchButton } from '@/components/PrivateThread/SearchButton';
import { UserStatus } from '../User/UserStatus';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/services/api/queries';
import type { User } from '@uxc/types';
import { Navigate } from 'react-router-dom';
import SvgIcon from '../Icon';

export function SidebarLayout({ body }: { body: React.ReactNode }) {
	const { loading, data, error } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	if (loading) {
		return <>Loading...</>;
	}

	if (error || !data) {
		// @todo logout user else infinite switchback
		return <Navigate replace to="/signin" />;
	}

	return (
		<aside
			className={`flex flex-col h-screen w-[22rem] min-w-[22rem] bg-primary-1100`}
		>
			<SearchButton />

			<>{body}</>
			<footer className="mt-auto h-20 bg-primary-1200">
				<div className="flex justify-between p-4">
					<UserStatus user={data.getCurrentUser} />
					<button>
						<SvgIcon name="gear" dimensions={28} />
					</button>
				</div>
			</footer>
		</aside>
	);
}
