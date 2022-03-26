import type { ChangeEvent } from 'react';

import React from 'react';

import * as S from './styles';

import { Input } from '@/components/Fields/Input';
import { useFriendSearch } from './hooks/useFriendSearch';
import { UserAvatar } from '../User/UserAvatar';

export function FriendsView() {
	const { query, setQuery, results } = useFriendSearch();

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
				{results.map(({ username, _id, ...rest }) => {
					return (
						<S.ListItem key={_id}>
							<UserAvatar u={{ username, _id, ...rest }} size="xl" />

							<S.Username>{username}</S.Username>
							<S.UserStatus>user status</S.UserStatus>
							<S.ActionsContainer>
								<S.ActionBubble />
								<S.ActionBubble />
							</S.ActionsContainer>
						</S.ListItem>
					);
				})}
			</S.ListContainer>
		</S.Container>
	);
}

FriendsView.displayName = 'FriendsView';
