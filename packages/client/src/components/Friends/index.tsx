import { ChangeEvent, useContext } from 'react';

import React from 'react';

import * as S from './styles';

import { Input } from '@/components/Fields/Input';
import { FriendsContext } from './FriendsContext';
import { Friend } from './Friend/Friend';
import { RecvPendingFriend } from './Friend/RecvPendingFriend';
import { SentPendingFriend } from './Friend/SentPendingFriend';

export function Friends() {
	const { query, setQuery, results } = useContext(FriendsContext);

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
		<S.Container>
			<S.Form>
				<Input
					autoComplete="off"
					data-testid="search-friends"
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
						return <Friend user={friend} key={friend._id} />;
					}

					if (friend.status === 'recv') {
						return <RecvPendingFriend user={friend} key={friend._id} />;
					}

					return <SentPendingFriend user={friend} key={friend._id} />;
				})}
			</S.ListContainer>
		</S.Container>
	);
}

Friends.displayName = 'Friends';
