import React, { ChangeEvent, FormEvent, useState } from 'react';

import type { SendMessage } from '@/components/Room/Room';

import { Input } from '@/components/Fields/Input';
import { SmileyIcon } from '@/components/Icons/SmileyIcon';

interface RoomTextInputProps {
	sendMessage: SendMessage;
	name: string;
}

export function RoomTextInput({ sendMessage, name }: RoomTextInputProps) {
	const [message, setMessage] = useState('');

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
		<form className="flex flex-col w-auto m-2" onSubmit={handleSubmit}>
			<div className="flex items-stretch">
				<div className="flex-1">
					<div className="flex flex-1 lg:mr-0 items-center bg-primary-700 rounded-8">
						<Input
							autoComplete="off"
							className="text-primary-100"
							maxLength={512}
							onChange={handleChange}
							placeholder={`Send a message in #${name}`}
							transparent
							value={message}
						/>

						<div className="right-12 cursor-pointer flex flex-row-reverse fill-current text-primary-100 mr-3">
							<SmileyIcon style={{ inlineSize: '23px' }} />
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

RoomTextInput.displayName = 'RoomTextInput';
