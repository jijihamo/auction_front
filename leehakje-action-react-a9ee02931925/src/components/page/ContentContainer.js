import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../page-contents/Home';
import About from '../page-contents/About';
import NoMatch from '../page-contents/NoMatch';
import Post from '../page-contents/Post';

class Content extends Component {
	render() {
		return (
			<div id="main" className="container">
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/404" component={NoMatch} />
				<Route path="/post/:id" component={Post} />
			</div>
		);
	}
}

export default Content;
