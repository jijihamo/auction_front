/* eslint-disable no-unused-vars */
import { Set } from 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
// import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
// import { logger } from 'redux-logger';
import App from './App';
import listBox from './reducers/reducers';
import focusBox from './reducers/focus-reducers';

const cabinet = combineReducers({
	listBox,
	focusBox,
});

// let middleware;
// if (process.env.NODE_ENV !== 'production') {
// 	middleware = logger;
// }

const store = createStore(cabinet);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
	document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}
