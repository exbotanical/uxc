import { cycleRange } from '../computed';

describe('general compute value utils', () => {
	describe('`cycleRange`', () => {
		it('cycles a range of numbers forward', () => {
			const ns: [number, number] = [0, 10];

			let mt = 2;
			while (mt--) {
				let max = ns[1];

				while (max > 1) {
					ns[0] = cycleRange(1, ...ns);
					expect(ns[0]).toBe(Math.abs(max - 11));

					max--;
				}

				ns[0] = cycleRange(1, ...ns);
				expect(ns[0]).toBe(0);
			}
		});

		it('cycles a range of numbers backward', () => {
			const ns: [number, number] = [0, 10];

			let mt = 2;

			while (mt--) {
				let iter = ns[1];

				while (--iter >= 0) {
					ns[0] = cycleRange(1, ...ns);

					expect(Math.abs(iter - 10) % 10).toBe(ns[0]);
				}

				expect(ns[0]).toBe(0);
			}
		});
	});
});
