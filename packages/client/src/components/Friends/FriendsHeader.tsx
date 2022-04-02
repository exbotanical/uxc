import React, { useContext } from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons/Button';
import SvgIcon from '../Icon';

import { FriendsContext } from './FriendsContext';

import type { FriendsViewMode } from './FriendsContext';

import { FontSizeXl, FontSizeLg } from '@/styles/Typography/FontSize';

const LabelContainer = styled.div.attrs({})`
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

export function FriendsHeader() {
	const { setViewMode, isCurrentView } = useContext(FriendsContext);

	function onClick(key: FriendsViewMode) {
		setViewMode(key);
	}

	const friendsOpts: {
		label: string;
		key: FriendsViewMode;
		onClick: (key: FriendsViewMode) => void;
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

			<div role="tablist" style={{ display: 'flex' }}>
				{friendsOpts.map(({ label, key, onClick }, idx) => (
					<Tab
						aria-controls={`${key}-panel`}
						data-testid={`${key}-tab`}
						id={`${key}-tab`}
						isSelected={isCurrentView(key)}
						key={idx}
						onClick={() => {
							onClick(key);
						}}
						role="tab"
					>
						<p>{label}</p>
					</Tab>
				))}
			</div>

			<Button size="sm">
				<p>Add Friend</p>
			</Button>
		</>
	);
}

FriendsHeader.displayName = 'FriendsHeader';
