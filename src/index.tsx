import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import middleware from './middleware';

import App from './App';
import './index.scss';

const store = createStore(reducer, undefined, middleware);

render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));