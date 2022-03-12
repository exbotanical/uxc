import React from 'react';

import * as S from './styles';

import { isTestRuntime } from '@/utils';

import './bubble.scss';

interface ErrorMessageProps {
	message: string;
}

export const MESSAGE_TIMEOUT = isTestRuntime ? 20000 : 5000;

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
