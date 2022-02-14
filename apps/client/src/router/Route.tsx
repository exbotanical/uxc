import React from 'react';
import { generatePath } from 'react-router';
import { NavLink } from 'react-router-dom';

export interface Route<T> {
	params: Params<T>;
	path: string;
	legacy?: boolean;
}

type Params<T> = T | null;

export function from<A, B>(baseRoute: Route<A>, appendRoute: Route<B>) {
	const { params, path } = appendRoute;

	const result: Route<A & B> = {
		params: params as A & B,
		path: `${baseRoute.path}${path}`
	};

	return result;
}

export interface LinkProps<T> {
	children?: React.ReactNode;
	innerRef?: React.Ref<HTMLAnchorElement>;
	to: Route<T>;
	params?: T;
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
