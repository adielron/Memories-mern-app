import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//keep track of that store and allows to access it from anywhere in the App
//we dont have to be in a parent or child component
//we can access that state from everywhere
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'
import './index.css';

//takes 2 things
//combined reducers file in app
const store = createStore(reducers, compose(applyMiddleware(thunk)))



ReactDOM.render(
  <Provider store ={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
