import React from 'react';
import styled from 'styled-components';

import { RowCenter } from '@/styles/Layout';

const mockImgs = [
	'https://upload.wikimedia.org/wikipedia/en/8/8e/Can_-_Tago_Mago.jpg',
	'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',
	'https://upload.wikimedia.org/wikipedia/en/f/fc/Thisheat.jpg'
];

function randomIntFromInterval(min: number, max: number) {
	return () => Math.floor(Math.random() * (max - min + 1) + min);
}

const randomIdx = randomIntFromInterval(0, mockImgs.length - 1);

const ListItem = styled(RowCenter).attrs({ as: 'li' })`
	padding: 0.125rem;
	margin: 0.25rem;
	border-radius: 0.75rem;
	border-radius: 0.75rem;
	cursor: pointer;
	transition-duration: 300ms;

	&:hover {
		/* transform: scale(1.05); */
	}
`;

const ChannelImg = styled.img`
	width: 100%;
	height: 4rem;
	border-radius: 0.375rem;
`;

export function Channel() {
	return (
		<ListItem>
			<div>
				<ChannelImg alt="@todo" src={mockImgs[randomIdx()]} />
			</div>
		</ListItem>
	);
}

Channel.displayName = 'Channel';
