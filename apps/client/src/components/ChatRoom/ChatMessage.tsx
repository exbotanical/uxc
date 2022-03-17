import { useMutation } from '@apollo/client';
import React, {
	ChangeEvent,
	useEffect,
	useRef,
	useState,
	useCallback
} from 'react';
import styled from 'styled-components';

import SvgIcon from '../Icon';
import { UserAvatar } from '../User/UserAvatar';

import type { MessageWithSender, Message, User } from '@uxc/types';

import { UPDATE_MESSAGE } from '@/services/api/queries';
import { FlexCol } from '@/styles/Layout';
import { FontSizeLg, FontSizeSm } from '@/styles/Typography/FontSize';
import { toReadable } from '@/utils';

const Container = styled.div`
	${FlexCol}
	${FontSizeLg}
	position: relative;

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.hover};
	}
`;

const OptionsContainer = styled.div`
	position: absolute;
	top: -0.5rem;
	right: 0px;
	display: flex;
	width: 7rem;
	justify-content: space-evenly;
	padding: 0.75rem;
	border-color: ${({ theme }) => theme.colors.blue['500']};
	border-top-width: 1px;
	background-color: ${({ theme }) => theme.colors.background.strong};
	border-radius: 0.25rem;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	color: ${({ theme }) => theme.colors.font.strong};
	gap: 12px;

	${Container}:not(:hover, :focus, :active, :focus-visible, :focus-within) & {
		visibility: hidden;
	}
`;

const BodyContainerSansMeta = styled.div`
	display: flex;
	padding-bottom: 0.25rem;
	margin-right: 0.75rem;
	margin-left: 6rem;
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
	margin-right: 0.75rem;
	margin-left: 0.75rem;
`;

const MetaContainer = styled.div`
	${FlexCol}
	width: 100%;
	align-items: flex-start;
`;

const MetaLabelContainer = styled.div`
	display: flex;
	align-items: center;
`;

const UsernameBody = styled.p`
	margin-right: 0.5rem;
	font-weight: 700;
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
	width: 100%;
	height: 100%;
	padding: 1rem;
	background-color: ${({ theme }) => theme.colors.background.dark};
	border-radius: 3px;
	color: ${({ theme }) => theme.colors.font.weak};
	resize: vertical;

	// @todo reuse
	&:focus {
		border: 1px solid ${({ theme }) => theme.colors.background.dark};
		box-shadow: 0 0 3px ${({ theme }) => theme.colors.font.weak};
		outline: none !important;
	}
`;

// @todo opts for all (e.g. emoji)
export function ChatMessage({
	body,
	createdAt,
	isSender,
	_id,
	sender,
	sansMeta
}: MessageWithSender & {
	isSender: boolean;
	sansMeta: boolean;
}) {
	const [editMode, setEditMode] = useState(false);
	const [messageBody, setMessageBody] = useState(body);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [updateMessage] = useMutation<{
		updateMessage: Message;
	}>(UPDATE_MESSAGE, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					getMessages: (previous: Message[]) => {
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
		// @todo disallow empty
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
			setEditMode(false);
		}
	}

	const focusEndOfTextarea = useCallback(
		(body: string) => {
			textareaRef.current?.focus();

			textareaRef.current?.setSelectionRange(body.length, body.length);

			if (textareaRef.current?.scrollTop != null) {
				textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
			}
		},
		[textareaRef]
	);

	const isSenderActions = isSender
		? {
				onDoubleClick: () => {
					setEditMode(true);
				},
				onKeyDown: handleKeydown
		  }
		: {};

	useEffect(() => {
		if (editMode) {
			focusEndOfTextarea(body);
		}
	}, [editMode, body, focusEndOfTextarea]);

	return (
		<Container>
			{sansMeta ? (
				<BodyContainerSansMeta {...isSenderActions}>
					{editMode ? (
						<StyledTextArea
							onChange={handleChange}
							ref={textareaRef}
							value={messageBody}
						/>
					) : (
						<p data-testid="message-body">{body}</p>
					)}
				</BodyContainerSansMeta>
			) : (
				<BodyContainer>
					<AvatarContainer>
						<UserAvatar size="lg" u={sender} withIndicator={false} />
					</AvatarContainer>

					<MetaContainer {...isSenderActions}>
						<MetaLabelContainer>
							<UsernameBody tabIndex={0}>{sender.username}</UsernameBody>
							<SentDateBody data-testid="message-datetime">
								{toReadable(createdAt)}
							</SentDateBody>
						</MetaLabelContainer>

						{editMode ? (
							<StyledTextArea
								onChange={handleChange}
								ref={textareaRef}
								value={messageBody}
							/>
						) : (
							<p data-testid="message-body">{body}</p>
						)}
					</MetaContainer>
				</BodyContainer>
			)}

			{isSender ? (
				<OptionsContainer>
					<Button data-testid="message-emote-btn" tabIndex={0} type="button">
						<SvgIcon name="smiley" size={21} />
					</Button>
					<Button
						data-testid="message-edit-btn"
						onClick={() => {
							setEditMode(true);
						}}
						tabIndex={0}
						type="button"
					>
						<SvgIcon name="edit" size={21} />
					</Button>
				</OptionsContainer>
			) : null}
		</Container>
	);
}

ChatMessage.displayName = 'ChatMessage';
