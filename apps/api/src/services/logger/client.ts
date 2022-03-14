/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Console } from 'console';
import { Writable } from 'stream';

import pkg from '../../../package.json';

import { isLocalRuntime } from '@/utils';

export class StreamLogger extends Console {
	constructor() {
		super({
			colorMode: false,

			stderr: new Writable({
				write(data, _, next) {
					process.stdout.write(data);
					next();
				}
			}),

			stdout: new Writable({
				write(data, _, next) {
					process.stdout.write(data);
					next();
				}
			})
		});
	}

	static init() {
		return new StreamLogger();
	}

	#log(method: 'error' | 'info' | 'log', bg: string, ...args: any[]) {
		if (!isLocalRuntime) {
			return;
		}

		const colorConfig = this.buildStr(bg);

		super[method](
			colorConfig,
			pkg.name,
			new Date().toLocaleTimeString(),
			...(args as string[]),
			'\x1b[0m'
		);
	}

	info(...args: any[]) {
		this.#log('info', '\x1B[48;2;95;87;165m', ...args);
	}

	success(...args: any[]) {
		this.#log('info', '\x1B[48;2;171;214;122m', ...args);
	}

	warn(...args: any[]) {
		this.#log('info', '\x1B[48;2;255;189;91m', ...args);
	}

	error(...args: any[]) {
		this.#log('error', '\x1B[48;2;252;58;107m', ...args);
	}

	private buildStr(bg: string) {
		const whiteFg = '\x1B[38;2;255;255;255m';
		const label = '\x1B[38;2;125;227;215m';

		return `${label}[%s@%s] ${whiteFg}${bg}%s`;
	}
}
