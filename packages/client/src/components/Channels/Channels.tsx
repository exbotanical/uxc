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

function Channel() {
	console.log(randomIdx());
	return (
		<li className="rounded-xl m-1 p-1 flex items-center justify-center cursor-pointer hover:bg-transparent-alt transition ease-in-out transform hover:scale-105 duration-300">
			<div className="h-6 ">
				<img
					className="rounded-md h-6"
					alt="@todo"
					src={mockImgs[randomIdx()]}
				/>
			</div>
		</li>
	);
}

/** @todo rerenders when changing chat */
export function Channels({ className = '' }: { className?: string }) {
	return (
		<div className={`text-white grid grid-rows-12 w-7 h-full ${className}`}>
			<ul>
				<Channel />
				<hr className="border-outline mx-2" />
				<Channel />
				<Channel />
				<Channel />
			</ul>
		</div>
	);
}
//
