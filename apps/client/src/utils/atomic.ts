export const noop = (...args: any) => {};
export const nullNoop = (...args: any) => null;

export const once = (fn: (...args: any) => any) => {
	let invoked = false;

	return () => {
		if (!invoked) {
			fn();
			invoked = true;
		}
	};
};

once(() => { console.log('e'); });
