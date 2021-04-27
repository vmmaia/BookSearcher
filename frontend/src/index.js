import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
