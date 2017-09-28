import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers/allReducers';
import initialState from './reducers/initialState';
import Dashboard from './components/Dashboard';
import RealPieCharts from './containers/RealPieCharts';
import LoginPageForm from './containers/LoginPageForm';
import NewCampaignFormFirstPage from './containers/NewCampaignFormFirstPage';
import NewCampaignFormStepsPage from './containers/NewCampaignFormStepsPage';
import NewCampaignFormConfirmationPage from './containers/NewCampaignFormConfirmationPage';
import NewLeadGroupForm from './containers/NewLeadGroupForm';
import styles from './css/app.scss';


render(
  <Provider store={createStore(reducers, initialState,
    composeWithDevTools(applyMiddleware(thunk)))}
  >
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/summary/newcampaign/confirm" component={NewCampaignFormConfirmationPage} />
          <Route path="/summary/newcampaign/steps" component={NewCampaignFormStepsPage} />
          <Route path="/summary/newcampaign" component={NewCampaignFormFirstPage} />
          <Route path="/summary/:id" component={RealPieCharts} />
          <Route path="/summary" component={Dashboard} />
          <Route path="/newgroup" component={NewLeadGroupForm} />
          <MuiThemeProvider>
            <Route path="/" component={LoginPageForm} />
          </MuiThemeProvider>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('content'),
);
