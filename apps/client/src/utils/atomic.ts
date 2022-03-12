/* eslint-disable @typescript-eslint/no-unused-vars */

export const noop = (..._: any) => {};
export const nullNoop = (..._: any) => null;

export const once = (fn: (...args: any) => any) => {
	let invoked = false;

	return () => {
		if (!invoked) {
			fn();
			invoked = true;
		}
	};
};
