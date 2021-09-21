import React from 'react';
import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

import '@/styles/App.scss';

interface CountContext {
	count: number;
}

const increment = (context: CountContext) => context.count + 1;
const decrement = (context: CountContext) => context.count - 1;

const counterMachine = createMachine({
	initial: 'active',
	context: {
		count: 0
	},
	states: {
		active: {
			on: {
				INCREMENT: {
					actions: assign({
						count: increment
					})
				},
				DECREMENT: {
					actions: assign({
						count: decrement
					})
				}
			}
		}
	}
});

function App () {
	const [state, send] = useMachine(counterMachine);

	return (
		<div className="app">
			<header className="app-header">
				<p>
					<button type="button" onClick={() => send('DECREMENT')}>
						decrement
					</button>
					<button type="button" onClick={() => send('INCREMENT')}>
            increment
					</button>
				</p>
				<p>
          count is: {state.context.count}
				</p>
			</header>
		</div>
	);
}

export default App;
