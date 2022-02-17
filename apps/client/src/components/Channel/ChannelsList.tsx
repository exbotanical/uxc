import React from 'react';

import { Channel } from '@/components/Channel/Channel';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 7rem;
	height: 100%;
	color: white;
	background-color: ${({ theme }) => theme.colors.primary['1200']};
`;

/** @todo rerenders when changing chat */
export function ChannelsList() {
	return (
		<Container>
			<ul>
				<Channel />
				<hr />
				<Channel />
				<Channel />
				<Channel />
			</ul>
		</Container>
	);
}

ChannelsList.displayName = 'ChannelsList';
