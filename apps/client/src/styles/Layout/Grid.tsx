import styled from 'styled-components';

export const FlexCol = `
	display: flex;
	flex-direction: column;
`;

export const RowCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ScreenReaderOnly = `
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
`;
