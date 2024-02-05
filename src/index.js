import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './modules';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk'

const store = createStore(rootReducer,applyMiddleware(logger, thunk))
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
