import { MachineConfig } from 'xstate';

interface LoginContext {
	email: string;
	password: string;
}

type LoginEvent =
	| { type: 'ENTER_EMAIL' }
	| { type: 'ENTER_PASSWORD' }
	| { type: 'EMAIL_BLUR' }
	| { type: 'PASSWORD_BLUR' }
	| { type: 'SUBMIT' };

const initialContext: LoginContext = {
	email: '',
	password: ''
};

const emailErrorMachine = {
	initial: 'badFormat',
	states: {
		badFormat: {},
		noAccount: {}
	}
};

const passwordErrorMachine = {
	initial: 'tooShort',
	states: {
		tooShort: {},
		incorrect: {}
	}
};

const machineSchema: MachineConfig<LoginContext, any, LoginEvent> = {
	id: 'login',
	initial: 'dataEntry',
	context: initialContext,
	states: {
		dataEntry: {
			on: {
				ENTER_EMAIL: {
					actions: 'cacheEmail'
				},
				ENTER_PASSWORD: {
					actions: 'cachePassword'
				},
				EMAIL_BLUR: {
					cond: 'isBadEmailFormat',
					target: 'emailError.badFormat'
				},
				PASSWORD_BLUR: {
					cond: 'isPasswordTooShort',
					target: 'passwordError.tooShort'
				},
				SUBMIT: [
					{
						cond: 'isBadEmailFormat',
						target: 'emailError.badFormat'
					},
					{
						cond: 'isPasswordTooShort',
						target: 'passwordError.tooShort'
					},
					{
						target: 'awaitingResponse'
					}
				]
			}
		},
		awaitingResponse: {
			invoke: {
				src: 'requestLogin',
				onDone: {
					target: 'authenticated'
				},
				onError: [
					{
						cond: 'hasNoAccount',
						target: 'emailError.noAccount'
					},
					{
						cond: 'isIncorrectPassword',
						target: 'passwordError.incorrect'
					},
					{
						cond: 'hasServiceError',
						target: 'serviceError'
					}
				]
			}
		},
		emailError: {
			on: {
				ENTER_EMAIL: {
					target: 'dataEntry',
					actions: 'cacheEmail'
				}
			},
			...emailErrorMachine
		},
		passwordError: {
			on: {
				ENTER_PASSWORD: {
					target: 'dataEntry',
					actions: 'cachePassword'
				}
			},
			...passwordErrorMachine
		},
		serviceError: {
			on: {
				SUBMIT: {
					target: 'awaitingResponse'
				}
			}
		},
		authenticated: {
			type: 'final'
		}
	},
	onDone: {
		actions: 'onAuthenticated'
	}
};

// const machineOpts =
export {
	machineSchema
};
