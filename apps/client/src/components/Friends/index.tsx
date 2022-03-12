import type { ChangeEvent } from 'react';

import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from '@/components/Fields/Input';
import { FlexCol } from '@/styles/Layout';
import { FontSizeBase, FontSizeXs } from '@/styles/Typography/FontSize';

const Container = styled.div`
	${FlexCol}
	flex-shrink: 1;
`;

const Form = styled.form`
	align-self: center;
	margin-top: 3rem;
	margin-bottom: 3rem;
`;

const ListContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const ListItem = styled.li`
	${FlexCol}
	justify-content: center;
	align-items: center;
	margin: 2rem;
`;

const Avatar = styled.div`
	background-color: ${({ theme }) => theme.colors.blue['100']};
	border-radius: 9999px;
	height: 5rem;
	width: 5rem;
	margin-bottom: 0.5rem;
`;

const Username = styled.h4`
	${FontSizeBase}
	font-weight: 700;
`;

const UserStatus = styled.h5`
	${FontSizeXs}
	font-weight: 700;
	color: ${({ theme }) => theme.colors.font.weak};
`;

const ActionsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	gap: 0.25rem;
`;

const ActionBubble = styled.div`
	border-radius: 9999px;
	height: 2rem;
	width: 2rem;
	background-color: ${({ theme }) => theme.colors.accent.norm};
`;

export function Friends() {
	const [searchText, setSearchText] = useState('');

	const searchOptions = [
		{
			iconName: 'search'
		}
	];

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setSearchText(value);
	};

	const rawFriends = [
		'Jane Doe',
		'John Doe',
		'Marco Inaros',
		'Naomi Nagata',
		'Amos Burton'
	];

	/** @todo robust impl */
	function naiveSearch(friend: string) {
		const cleanSearchText = searchText.trim().toLowerCase();
		const cleanFriendText = friend.toLowerCase();

		return cleanFriendText.includes(cleanSearchText);
	}

	const filteredFriends = rawFriends.filter(naiveSearch);

	return (
		<Container>
			<Form>
				<Input
					autoComplete="off"
					label="Search friends"
					maxLength={512}
					onChange={handleChange}
					options={searchOptions}
					placeholder="Search friends"
					value={searchText}
					data-testid="search-friends"
				/>
			</Form>

			<ListContainer>
				{filteredFriends.map((i, idx) => {
					return (
						<ListItem key={idx}>
							<Avatar />
							<Username>{i}</Username>
							<UserStatus>user status</UserStatus>
							<ActionsContainer>
								<ActionBubble />
								<ActionBubble />
							</ActionsContainer>
						</ListItem>
					);
				})}
			</ListContainer>
		</Container>
	);
}
