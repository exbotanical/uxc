import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserAvatar } from '../User/UserAvatar';

import type { ObjectID, User } from '@uxc/types';

import { GET_CURRENT_USER } from '@/services/api/queries';
import { StatefulThread, ThreadsContext } from '@/state/context/ThreadsContext';
import { onEnterKeyPressed } from '@/utils';
import styled from 'styled-components';
import { ListItem } from './styles';
import { RowCenter } from '@/theme/Layout';
import { FontSizeLg } from '@/theme/Typography/FontSize';

interface PrivateThreadProps {
	id: ObjectID;
}

const PaddedListItem = styled(ListItem)`
	padding: 0.5rem;
`;

const UsernameLabel = styled.p`
	${FontSizeLg}
	font-weight: 600;
	margin: auto;
	margin-left: 0.75rem;
`;

export function PrivateThread({ id }: PrivateThreadProps) {
	const { getThreadById } = useContext(ThreadsContext);
	const thread = getThreadById(id);

	const { data: user } = useQuery<{
		getCurrentUser: User;
	}>(GET_CURRENT_USER);

	const navigate = useNavigate();
	const location = useLocation();
	const paths = location.pathname.split('/');
	const isActiveItem = paths[paths.length - 1] == id;

	const them = thread?.users.find(
		({ _id }) => _id !== user?.getCurrentUser._id
	);

	const handleClick = () => {
		navigate(`/${id}`);
	};

	/** @todo handler erroneous state */
	if (!them || !thread) {
		return null;
	}

	return (
		<PaddedListItem
			isActiveItem={isActiveItem}
			onClick={handleClick}
			onKeyPress={(e) => {
				onEnterKeyPressed(handleClick)<HTMLLIElement>(e);
			}}
			role="button"
			tabIndex={0}
		>
			<RowCenter>
				<UserAvatar size="md" u={them} newMessagesCount={thread.newMessages} />

				<UsernameLabel>{them.username}</UsernameLabel>
			</RowCenter>
		</PaddedListItem>
	);
}

PrivateThread.displayName = 'PrivateThread';
