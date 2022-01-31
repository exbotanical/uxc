import { NavLink } from 'react-router-dom';
import { generatePath } from 'react-router';
import React from 'react';

export interface Route<T> {
	path: string;
	params: Params<T>;
	legacy?: boolean;
}

type Params<T> = T | null;

export function from<A, B>(baseRoute: Route<A>, appendRoute: Route<B>) {
	const { path, params } = appendRoute;

	const result: Route<A & B> = {
		path: `${baseRoute.path}${path}`,
		params: (params as A & B) ?? null
	};

	return result;
}

export interface LinkProps<T> {
	children?: React.ReactNode;
	to: Route<T>;
	params?: T;
	innerRef?: React.Ref<HTMLAnchorElement>;
}

export function build<T>(route: Route<T>, params: T) {
	return generatePath(
		route.path,
		params && Object.fromEntries(Object.entries(params))
	);
}

export default function Link<T>({ to, children, params }: LinkProps<T>) {
	const path = params ? build(to, params) : to.path;

	return <NavLink to={path}>{children}</NavLink>;
}
