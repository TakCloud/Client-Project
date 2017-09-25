import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers/allReducers';
import Dashboard from './components/Dashboard';
import RealPieCharts from './containers/RealPieCharts';
import LoginPageForm from './containers/LoginPageForm';
import NewCampaignFormFirstPage from './containers/NewCampaignFormFirstPage';
import NewCampaignFormStepsPage from './containers/NewCampaignFormStepsPage';
import NewCampaignFormConfirmationPage from './containers/NewCampaignFormConfirmationPage';
import styles from './css/app.scss';


render(
  <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/dashboard/newcampaign/confirm" component={NewCampaignFormConfirmationPage} />
          <Route path="/dashboard/newcampaign/steps" component={NewCampaignFormStepsPage} />
          <Route path="/dashboard/newcampaign" component={NewCampaignFormFirstPage} />
          <Route path="/dashboard/:id" component={RealPieCharts} />
          <Route path="/dashboard" component={Dashboard} />
          <MuiThemeProvider>
            <Route path="/" component={LoginPageForm} />
          </MuiThemeProvider>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('content'),
);
