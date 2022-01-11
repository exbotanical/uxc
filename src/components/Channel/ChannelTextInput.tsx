import React, { ChangeEvent, FormEvent, useState } from 'react';

import type { FC } from 'react';

import { Input } from '@/ui/Input';
import { SmileyIcon } from '@/ui/Icons/SmileyIcon';

import type { SendMessage } from '@/pages/Channel';

interface ChannelTextInputProps {
	sendMessage: SendMessage;
	name: string;
}

export const ChannelTextInput: FC<ChannelTextInputProps> = ({
	sendMessage,
	name
}) => {
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
		<div className="pb-3 px-4 pt-2 flex flex-col">
			<form onSubmit={handleSubmit} className="flex flex-col w-auto m-2">
				<div className="mb-1 block relative"></div>
				<div className="flex items-stretch">
					<div className="flex-1">
						<div className="flex flex-1 lg:mr-0 items-center bg-primary-700 rounded-8">
							<Input
								maxLength={512}
								placeholder={`Send a message in #${name}`}
								value={message}
								onChange={handleChange}
								transparent
								autoComplete="off"
								className="text-primary-100"
							/>
							<div className="right-12 cursor-pointer flex flex-row-reverse fill-current text-primary-100 mr-3">
								<SmileyIcon style={{ inlineSize: '23px' }} />
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

ChannelTextInput.displayName = 'ChannelTextInput';
