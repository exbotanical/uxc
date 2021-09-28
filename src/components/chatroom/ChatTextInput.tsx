import React from 'react';

import '@/styles/chat-text-input.scss';

const ChatTextInput = () => {
	return (
		<div className="chat__input-field">
			<form>
				<input
					value={''}
					readOnly
					type="text"
					placeholder={'Send a message in #roomname'}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default ChatTextInput;
