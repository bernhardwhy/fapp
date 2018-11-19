import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import baseReducer from './store/reducer/reducer';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    baseReducer: baseReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const startApp = () => {
    ReactDOM.render(<Provider store={ store }><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));
    registerServiceWorker();
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}