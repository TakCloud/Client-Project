import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers/allReducers';
import Dashboard from './components/Dashboard';
import RealPieCharts from './containers/RealPieCharts';
import LoginForm from './containers/LoginForm';
import styles from './css/app.scss';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// Apply ReduxPromise middleware before action hits reducer

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/dashboard/:id" component={RealPieCharts} />
          <Route path="/dashboard" component={Dashboard} />
          <MuiThemeProvider>
            <Route path="/" component={LoginForm} />
          </MuiThemeProvider>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('content'),
);
