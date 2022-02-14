import type { ChangeEvent, FormEvent } from 'react';

import React, { useState } from 'react';

import type { SendMessage } from '@/components/ChatRoom';

import { Input } from '@/components/Fields/Input';

interface ChatMessageInputProps {
	sendMessage: SendMessage;
	name: string;
}

export function ChatMessageInput({ sendMessage, name }: ChatMessageInputProps) {
	const [message, setMessage] = useState('');

	const chatOptions = [
		{
			handleClick: console.log,
			iconName: 'smiley'
		}
	];

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!message) return;

		sendMessage(message);
		setMessage('');
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setMessage(value);
	};

	return (
		<form className="flex flex-col w-auto" onSubmit={handleSubmit}>
			<Input
				autoComplete="off"
				label="Send message"
				maxLength={512}
				onChange={handleChange}
				options={chatOptions}
				placeholder={`Send a message to ${name}`}
				value={message}
			/>
		</form>
	);
}

ChatMessageInput.displayName = 'ChatMessageInput';
