import React, { useState } from 'react';

import SvgIcon from '../Icon';
import { UserAvatar } from '../User/UserAvatar';

import type { Message, User } from '@uxc/types';

import { toReadable } from '@/utils';
import styled from 'styled-components';
import { FlexCol } from '@/theme/Layout';
import { FontSizeLg, FontSizeSm } from '@/theme/Typography/FontSize';

const Container = styled.div<{ hover: boolean }>`
	${FlexCol}
	${FontSizeLg}
	background-color:${({ theme, hover }) => hover && theme.colors.primary['1100']};
	position: relative;
`;

const OptionsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	position: absolute;
	right: 0px;
	top: -0.5rem;
	width: 5rem;
	padding: 0.5rem;
	border-radius: 0.125rem;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.blue['500']};
	background-color: ${({ theme }) => theme.colors.primary['1000']};
	color: ${({ theme }) => theme.colors.primary['100']};
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const BodyContainerSansMeta = styled.div`
	display: flex;
	padding-bottom: 0.25rem;
	margin-left: 6rem;
	margin-right: 0.75rem;
`;

const BodyContainer = styled.div`
	display: flex;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-bottom: 0.25rem;
	margin-left: 0.75rem;
	margin-right: 0.75rem;
`;

const AvatarContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-left: 0.75rem;
	margin-right: 0.75rem;
`;

const MetaContainer = styled.div`
	${FlexCol}
	align-items: flex-start;
`;

const MetaLabelContainer = styled.div`
	display: flex;
	align-items: center;
`;

const UsernameBody = styled.p`
	font-weight: 700;
	margin-right: 0.5rem;
`;

const SentDateBody = styled.p`
	${FontSizeSm}
	color: ${({ theme }) => theme.colors.primary['200']};
`;

export function ChatMessage({
	body,
	createdAt,
	isSender,
	sender,
	sansMeta
}: Omit<Message, 'sender'> & {
	isSender: boolean;
	sender: User;
	sansMeta: boolean;
}) {
	const [hover, setHover] = useState(false);

	return (
		<Container
			hover={hover}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			{hover ? (
				<OptionsContainer>
					<button type="button">
						<SvgIcon dimensions={20} name="smiley" />
					</button>
					<button type="button">
						<SvgIcon dimensions={20} name="edit" />
					</button>
				</OptionsContainer>
			) : null}

			{sansMeta ? (
				<BodyContainerSansMeta>
					<p>{body}</p>
				</BodyContainerSansMeta>
			) : (
				<BodyContainer>
					<AvatarContainer>
						<UserAvatar size="lg" u={sender} withIndicator={false} />
					</AvatarContainer>

					<MetaContainer>
						<MetaLabelContainer>
							<UsernameBody>{sender.username}</UsernameBody>

							<SentDateBody>{toReadable(createdAt)}</SentDateBody>
						</MetaLabelContainer>

						<p>{body}</p>
					</MetaContainer>
				</BodyContainer>
			)}
		</Container>
	);
}

ChatMessage.displayName = 'ChatMessage';
