import { isLocalRuntime } from '@/utils';
import pkg from '../../../package.json';

export class Logger {
	#transport = console;

	#baseFormat = `font-weight:bold;padding:6px;border:solid 1px white;border-radius:3px;`;

	#log(method: 'error' | 'info' | 'log', hex: string, ...args: any[]) {
		if (!isLocalRuntime) {
			return;
		}

		const callable = this.#transport[method];

		callable(
			`%c${pkg.name}`,
			`${this.#baseFormat}background:${hex}`,
			'\n\n',
			...args
		);
	}

	info(...args: any[]) {
		this.#log('info', '#5f57a5', ...args);
	}

	success(...args: any[]) {
		this.#log('info', '#abd67a', ...args);
	}

	warn(...args: any[]) {
		this.#log('info', '#ffbd5b', ...args);
	}

	error(...args: any[]) {
		this.#log('error', '#fc3a6b', ...args);
	}
}
