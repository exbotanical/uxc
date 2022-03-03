import React from 'react';
import styled from 'styled-components';
import SvgIcon from '../Icon';

const ListItem = styled.li`
	position: 'relative';
`;

const LinkBoundary = styled.a`
	display: block;
	border-top-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding: 1rem 1.5rem;
	display: flex;
	align-items: center;
`;

const ListItemContent = styled.div`
	flex: auto;
	display: flex;
	flex-direction: column-reverse;
	min-width: 0;
	z-index: 1;
`;

const InnerButtonContainer = styled.div`
	margin-left: 0.875rem;
	flex: none;
`;

const OuterButtonContainer = styled.div`
	margin-left: 0.75rem;
	border-left-width: 1px;
	border-color: ${({ theme }) => theme.colors.border.weak};
	padding-left: 0.75rem;
`;

const ResultTitle = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.5rem;
`;

const ResultData = styled.span`
	margin-bottom: 0.25rem;
	align-self: flex-start;

	background: #f1f5f9;
	border-radius: 999px;
	padding: 0 0.375rem;
`;

const IconButton = styled.button`
	display: flex;
	width: 1.5rem;
	height: 1.5rem;
`;

export function SearchResult() {
	return (
		<ListItem>
			<LinkBoundary>
				<div />
				<ListItemContent>
					<ResultTitle>TITLE</ResultTitle>
					<ResultData>DATA</ResultData>
				</ListItemContent>
				<InnerButtonContainer>
					<IconButton title="Save this search">
						<SvgIcon name="star" size={20} />
					</IconButton>
				</InnerButtonContainer>
				<OuterButtonContainer>
					<IconButton title="Remove this search from history">
						<SvgIcon name="close" size={20} />
					</IconButton>
				</OuterButtonContainer>
			</LinkBoundary>
		</ListItem>
	);
}
