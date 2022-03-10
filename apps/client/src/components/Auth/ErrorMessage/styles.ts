import styled from 'styled-components';


export const ErrorBubble = styled.div`
	position: absolute;
	right: -20px;
	top: -60px;
`;

export const ErrorMessageContainer = styled.div`
	display: flex;
	margin: 1rem 0;
	width: 100%;
	color: ${({ theme }) => theme.colors.error.norm};

	&::after {
		content: '';
		position: absolute;
		right: -20px;
		bottom: -1.25rem;
		border: 2rem solid;
		border-color: transparent transparent transparent
			${({ theme }) => theme.colors.error.weak};
	}
`;

export const ErrorMessage = styled.div`
	z-index: 2;
	display: flex;
	align-items: center;
	padding: 0.75em 1.5em;
	background: ${({ theme }) => theme.colors.error.weak};
	border-radius: 4px;
`;
