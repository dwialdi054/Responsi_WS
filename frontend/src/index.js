import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import "bulma/css/bulma.css";
import axios from 'axios';
import { store } from './app/store';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
