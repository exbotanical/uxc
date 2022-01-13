import React from 'react';

export function SidebarItem({
	Left,
	Right
}: {
	Left: JSX.Element;
	Right: JSX.Element;
}) {
	return (
		<div className="grid grid-cols-4 items-center text-white my-1">
			<div className="col-span-3">{Left}</div>

			<div className="place-self-end">{Right}</div>
		</div>
	);
}
