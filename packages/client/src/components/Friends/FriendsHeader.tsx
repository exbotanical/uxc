import { FontSizeXl, FontSizeLg } from '@/styles/Typography/FontSize';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '../Buttons/Button';
import SvgIcon from '../Icon';
import { FriendsContext } from './FriendsContext';
import type { FriendsViewMode } from './FriendsContext';

const LabelContainer = styled.div.attrs({
	role: 'tablist'
})`
	display: flex;
	height: 100%;
	align-items: center;
	padding: 1rem;

	& > svg {
		margin-right: 1rem;
	}
`;

const Label = styled.p`
	${FontSizeXl}
	font-weight: 700;
	color: ${({ theme }) => theme.colors.font.strong};
`;

const Separator = styled.div`
	border-right: 1px solid ${({ theme }) => theme.colors.border.norm};
	height: 30px;
	margin-left: 1.5rem;
`;

const Tab = styled.button.attrs<{ isSelected: boolean }>(({ isSelected }) => ({
	'role': 'tab',
	'aria-selected': isSelected
}))<{ isSelected: boolean }>`
	${FontSizeLg}
	color: ${({ isSelected, theme }) =>
		isSelected ? theme.colors.font.strong : theme.colors.font.weak};
	display: flex;
	height: 100%;
	align-items: center;
	padding: 1rem;
	cursor: pointer;
`;

const AddFriendButton = styled(Button)`
	width: max-content;
	padding: 0.125rem 1rem;
`;

export function FriendsHeader() {
	const { setViewMode, isCurrentView } = useContext(FriendsContext);

	function onClick(this: { key: FriendsViewMode }) {
		setViewMode(this.key);
		console.log(this);
	}

	const friendsOpts: {
		label: string;
		key: FriendsViewMode;
		onClick: () => void;
	}[] = [
		{
			label: 'Online',
			key: 'online',
			onClick
		},
		{
			label: 'All',
			key: 'all',
			onClick
		},
		{
			label: 'Pending',
			key: 'pending',
			onClick
		},
		{
			label: 'Blocked',
			key: 'blocked',
			onClick
		}
	];

	return (
		<>
			<LabelContainer>
				<SvgIcon name="people" size={21} />
				<Label>Friends</Label>
				<Separator />
			</LabelContainer>

			{friendsOpts.map(({ label, key, onClick }, idx) => (
				<Tab
					key={idx}
					aria-labelledby={`${key}-tab`}
					isSelected={isCurrentView(key)}
					onClick={onClick.bind({ key })}
				>
					<p id={`${key}-tab`}>{label}</p>
				</Tab>
			))}

			<AddFriendButton>
				<p>Add Friend</p>
			</AddFriendButton>
		</>
	);
}

FriendsHeader.displayName = 'FriendsHeader';
