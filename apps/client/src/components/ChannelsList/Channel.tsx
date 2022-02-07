import React from 'react';
const mockImgs = [
	'https://upload.wikimedia.org/wikipedia/en/8/8e/Can_-_Tago_Mago.jpg',
	'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',
	'https://upload.wikimedia.org/wikipedia/en/f/fc/Thisheat.jpg'
];

function randomIntFromInterval(min: number, max: number) {
	return () => Math.floor(Math.random() * (max - min + 1) + min);
}

const randomIdx = randomIntFromInterval(0, mockImgs.length - 1);

export function Channel() {
	return (
		<li className="rounded-xl m-1 p-0.5 flex items-center justify-center cursor-pointer hover:bg-transparent-alt transition ease-in-out transform hover:scale-105 duration-300">
			<div className="h-[65px]">
				<img
					alt="@todo"
					className="rounded-md w-full h-[4rem]"
					src={mockImgs[randomIdx()]}
				/>
			</div>
		</li>
	);
}

Channel.displayName = 'Channel';
