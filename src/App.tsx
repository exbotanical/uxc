import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import Landing from '@/pages/Landing';
import ChatRoom from '@/pages/ChatRoom';

import './App.scss';

// vite would need to do some extra parsing if we made this a `.ts` file,
// and so all files containing jsx will bear the extension
const App = () => {
	return (
		<div className="main-layout">
			<BrowserRouter>
				<Header />
				<div className="main-layout__body">
					<Sidebar />
					<Switch>
						<Route path="/channel/:id" component={ChatRoom} />
						<Route path="/" component={Landing} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
