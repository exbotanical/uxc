import React, { ChangeEvent, useContext } from 'react';


import * as S from './styles';

import { Input } from '@/components/Fields/Input';
import { Friend } from '@/components/Friends/Friend/Friend';
import { RecvPendingFriend } from '@/components/Friends/Friend/RecvPendingFriend';
import { SentPendingFriend } from '@/components/Friends/Friend/SentPendingFriend';
import { FriendsContext } from '@/components/Friends/FriendsContext';

export function Friends() {
	const { query, setQuery, results, viewMode } = useContext(FriendsContext);

	const searchOptions = [
		{
			iconName: 'search'
		}
	];

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setQuery(value);
	};

	return (
		<S.Container
			aria-labelledby={`${viewMode}-tab`}
			id={`${viewMode}-panel`}
			role="tabpanel"
		>
			<S.Form>
				<Input
					autoComplete="off"
					data-testid="filter-friends"
					label="Search friends"
					maxLength={512}
					onChange={handleChange}
					options={searchOptions}
					placeholder="Search friends"
					value={query}
				/>
			</S.Form>

			<S.ListContainer>
				{results.map((friend) => {
					if (friend.status === 'friend') {
						return <Friend key={friend._id} user={friend} />;
					}

					if (friend.status === 'recv') {
						return <RecvPendingFriend key={friend._id} user={friend} />;
					}

					return <SentPendingFriend key={friend._id} user={friend} />;
				})}
			</S.ListContainer>
		</S.Container>
	);
}

Friends.displayName = 'Friends';
