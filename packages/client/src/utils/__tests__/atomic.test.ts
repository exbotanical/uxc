import { once } from '../atomic';

describe('atomic utilities', () => {
	it('invokes the callback only once', () => {
		const mock = jest.fn();

		const fn = once(mock);

		fn();
		expect(mock).toHaveBeenCalledTimes(1);

		fn();
		expect(mock).toHaveBeenCalledTimes(1);
	});
});
