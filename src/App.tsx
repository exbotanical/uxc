import React, { useState } from 'react';
import '@/styles/App.scss';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import About from './components/About';
import ThemeContext from './context/ThemeContext';

function App() {
	const theme = useState('darkblue');

	return (
		// @ts-ignore TODO
		<ThemeContext.Provider value={theme}>
			<div className="app">
				<Router>
					<header className="app-header">
						Header
						{/* TODO <button onClick={theme[1]}>
							I want to pimp out my ride
						</button> */}
					</header>
					<Switch>
						<Route path="/about/:id">
							{/* @ts-ignore TODO */}
							<About />
						</Route>
						<Route exact path="/"></Route>
					</Switch>
					<footer>
						<Link to="/">Home</Link>
					</footer>
				</Router>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
