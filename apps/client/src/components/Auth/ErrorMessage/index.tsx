import React from 'react';

import * as S from './styles';

import './bubble.scss';

interface ErrorMessageProps {
	message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
	return (
		<S.ErrorBubble className="bubble" data-testid="error-message">
			<S.ErrorMessageContainer className="message">
				<S.ErrorMessage>
					<p>{message}</p>
				</S.ErrorMessage>
			</S.ErrorMessageContainer>
		</S.ErrorBubble>
	);
}
