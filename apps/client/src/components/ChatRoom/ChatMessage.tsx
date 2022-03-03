import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SvgIcon from '../Icon';
import { UserAvatar } from '../User/UserAvatar';

import type { Message, User } from '@uxc/types';

import { UPDATE_MESSAGE } from '@/services/api/queries';
import { FlexCol } from '@/styles/Layout';
import { FontSizeLg, FontSizeSm } from '@/styles/Typography/FontSize';
import { toReadable } from '@/utils';

const Container = styled.div<{ hover: boolean }>`
	${FlexCol}
	${FontSizeLg}
	background-color:${({ theme, hover }) =>
		hover && theme.colors.background.hover};
	position: relative;
`;

const OptionsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	position: absolute;
	right: 0px;
	top: -0.5rem;
	width: 7rem;
	padding: 0.75rem;
	gap: 12px;
	border-radius: 0.25rem;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.blue['500']};
	background-color: ${({ theme }) => theme.colors.background.strong};
	color: ${({ theme }) => theme.colors.font.strong};
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
	padding: 0.75rem 0;
	margin: 0 0.75rem;
	cursor: default;
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
	width: 100%;
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
	color: ${({ theme }) => theme.colors.font.weak};
`;

const Button = styled.button`
	color: ${({ theme }) => theme.colors.font.strong};
`;

const StyledTextArea = styled.textarea.attrs({
	spellCheck: false
})`
	${FontSizeLg}
	padding: 1rem;
	color: ${({ theme }) => theme.colors.font.weak};
	background-color: ${({ theme }) => theme.colors.background.dark};
	width: 100%;
	border-radius: 3px;

	// @todo reuse
	&:focus {
		outline: none !important;
		border: 1px solid ${({ theme }) => theme.colors.background.dark};
		box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.weak};
	}
`;

// @todo opts for all (e.g. emoji)
export function ChatMessage({
	body,
	createdAt,
	isSender,
	_id,
	sender,
	threadId,
	sansMeta
}: Omit<Message, 'sender'> & {
	isSender: boolean;
	sender: User;
	sansMeta: boolean;
}) {
	const [hover, setHover] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [messageBody, setMessageBody] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [updateMessage] = useMutation<{
		updateMessage: Message;
	}>(UPDATE_MESSAGE, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					getMessages: (previous) => {
						return [...previous, data!.updateMessage];
					}
				}
			});
		}
	});

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setMessageBody(e.target.value);
	}

	function handleKeydown(e: React.KeyboardEvent<HTMLDivElement>) {
		// @todo refine keybindings e.g. do not close on shift+enter
		// @todo rich text editor
		if (e.key === 'Enter' || e.key === 'Escape') {
			e.preventDefault();
			e.stopPropagation();

			// @todo sanitize
			if (messageBody !== body) {
				updateMessage({
					variables: {
						messageId: _id,
						body: messageBody
					}
				});
			}

			// @todo remove delay of pre-edited body in render
			setEditModeProxy(false);
		}
	}

	function setEditModeProxy(nextState: boolean) {
		setEditMode(nextState);
		if (nextState) {
			setMessageBody(body);
		}
	}

	useEffect(() => {
		if (editMode) {
			focusEndOfTextarea(body);
		}
	}, [editMode]);

	function focusEndOfTextarea(body: string) {
		textareaRef.current?.focus();

		textareaRef.current?.setSelectionRange(body.length, body.length);

		if (textareaRef.current?.scrollTop != null) {
			textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
		}
	}

	const isSenderActions = isSender
		? {
				onDoubleClick: () => {
					setEditModeProxy(true);
				},
				onKeyDown: handleKeydown
		  }
		: {};

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
			{hover && isSender ? (
				<OptionsContainer>
					<Button tabIndex={-1} type="button">
						<SvgIcon name="smiley" size={21} />
					</Button>
					<Button
						onClick={() => {
							setEditModeProxy(true);
						}}
						type="button"
					>
						<SvgIcon name="edit" size={21} />
					</Button>
				</OptionsContainer>
			) : null}

			{sansMeta ? (
				<BodyContainerSansMeta {...isSenderActions}>
					{editMode ? (
						<StyledTextArea
							onChange={handleChange}
							ref={textareaRef}
							value={messageBody}
						/>
					) : (
						<p>{body}</p>
					)}
				</BodyContainerSansMeta>
			) : (
				<BodyContainer>
					<AvatarContainer>
						<UserAvatar size="lg" u={sender} withIndicator={false} />
					</AvatarContainer>

					<MetaContainer {...isSenderActions}>
						<MetaLabelContainer>
							<UsernameBody>{sender.username}</UsernameBody>
							<SentDateBody>{toReadable(createdAt)}</SentDateBody>
						</MetaLabelContainer>

						{editMode ? (
							<StyledTextArea
								onChange={handleChange}
								ref={textareaRef}
								value={messageBody}
							/>
						) : (
							<p>{body}</p>
						)}
					</MetaContainer>
				</BodyContainer>
			)}
		</Container>
	);
}

ChatMessage.displayName = 'ChatMessage';
