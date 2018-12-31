import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './css/site.css';

import Header from './components/header/Header';
import Content from './components/page/ContentContainer';

class App extends React.PureComponent {
	render() {
		return (
			<Router>
				<div className="wrap">
					<Header />
					<Content />
				</div>
			</Router>
		);
	}
}

export default App;
