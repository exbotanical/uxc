import { useQuery } from '@apollo/client';
import React, { forwardRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import * as S from './styles';

import type { ObjectID, User } from '@uxc/types';

import { UserAvatar } from '@/components/User/UserAvatar';
import { GET_CURRENT_USER } from '@/services/api/queries';
import { ThreadsContext } from '@/state/context/ThreadsContext';
import { RowCenter } from '@/styles/Layout';
import { FontSizeLg } from '@/styles/Typography/FontSize';
import { onEnterKeyPressed } from '@/utils';

interface PrivateThreadProps {
	id: ObjectID;
}

const PaddedListItem = styled(S.ListItem)`
	padding: 0.5rem;
	cursor: pointer;
	position: relative;
`;

const UsernameLabel = styled.p`
	${FontSizeLg}
	margin: auto;
	margin-left: 0.75rem;
`;

export const PrivateThread = forwardRef<HTMLLIElement, PrivateThreadProps>(
	({ id }, ref) => {
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
				data-testid={`thread-${id}`}
				isActiveItem={isActiveItem}
				onClick={handleClick}
				onKeyPress={(e) => {
					onEnterKeyPressed(handleClick)<HTMLLIElement>(e);
				}}
				ref={ref}
				role="button"
				tabIndex={-1}
			>
				{isActiveItem ? <S.ActiveItemIndicator /> : null}
				<RowCenter>
					<UserAvatar
						newMessagesCount={thread.newMessages}
						size="md"
						u={them}
					/>

					<UsernameLabel>{them.username}</UsernameLabel>
				</RowCenter>
			</PaddedListItem>
		);
	}
);

PrivateThread.displayName = 'PrivateThread';
