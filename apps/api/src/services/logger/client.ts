import { Console } from 'console';
import { Writable } from 'stream';

import { isLocalRuntime } from '@/utils';
import pkg from '../../../package.json';

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
			...args,
			'\x1b[0m'
		);
	}

	private buildStr(bg: string) {
		const whiteFg = '\x1B[38;2;255;255;255m';
		const label = '\x1B[38;2;125;227;215m';

		return `${label}[%s@%s] ${whiteFg}${bg}%s`;
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
}

function hexToRgb(color: string, orientation: 'fg' | 'bg') {
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	if (orientation === 'fg') {
		return `\x1b[38;2;${r};${g};${b}m`;
	}

	return `\x1b[48;2;${r};${g};${b}m`;
}
