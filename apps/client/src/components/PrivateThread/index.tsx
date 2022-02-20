import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ListItem } from './styles';

import SvgIcon from '@/components/Icon';
import { Delimiter } from '@/components/PrivateThread/Delimiter';
import { PrivateThread } from '@/components/PrivateThread/PrivateThread';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { FlexCol } from '@/styles/Layout';
import { FontSizeLg } from '@/styles/Typography/FontSize';


const PaddedListItem = styled(ListItem)`
	padding: 1rem;
	cursor: pointer;
`;

const FriendsLabel = styled.p`
	${FontSizeLg}
	font-weight: 600;
	margin-left: 1rem;
`;

const ThreadsListContainer = styled.ul`
	${FlexCol}
	overflow-y: auto;
	height: 100%;
`;

/**
 * @todo scrollto selected item
 */
export function PrivateThreadsList() {
	const { threads } = useContext(ThreadsContext);
	const navigate = useNavigate();
	const location = useLocation();

	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == '';

	const handleClick = (path: string) => {
		navigate(`/${path}`);
	};

	const onEnterKeyPressed = (
		event: React.KeyboardEvent<HTMLLIElement>,
		path: string
	) => {
		if (event.key == 'Enter') {
			event.preventDefault();
			handleClick(path);
		}
	};

	return (
		<>
			<ul>
				<PaddedListItem
					isActiveItem={isActiveItem}
					onClick={() => {
						handleClick('');
					}}
					onKeyPress={(e) => {
						onEnterKeyPressed(e, '/');
					}}
					role="button"
					tabIndex={0}
				>
					<SvgIcon name="people" size={21} />
					<FriendsLabel>Friends</FriendsLabel>
				</PaddedListItem>
			</ul>

			<Delimiter title="Direct Messages" />

			<ThreadsListContainer>
				{threads.map(({ _id: id }) => (
					<PrivateThread id={id} key={id} />
				))}
			</ThreadsListContainer>
		</>
	);
}

PrivateThreadsList.displayName = 'PrivateThreadsList';
