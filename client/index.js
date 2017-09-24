import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers/allReducers';
import Dashboard from './components/Dashboard';
import RealPieCharts from './containers/RealPieCharts';
import LoginForm from './containers/LoginForm';
import NewCampaignFormFirstPage from './containers/NewCampaignFormFirstPage';
import CreateTemplate from './containers/CreateTemplate';
import TemplateContainer from './containers/TemplateContainer';
import NewCampaignStepsForm from './containers/NewCampaignStepsForm';
import NewCampaignFormConfirmationPage from './containers/NewCampaignFormConfirmationPage';
import styles from './css/app.scss';


render(
  <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(promise)))}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/dashboard/newcampaign/template/new" component={CreateTemplate} />
          <Route path="/dashboard/newcampaign/template" component={TemplateContainer} />
          <Route path="/dashboard/newcampaign/confirm" component={NewCampaignFormConfirmationPage} />
          <Route path="/dashboard/newcampaign/steps" component={NewCampaignStepsForm} />
          <Route path="/dashboard/newcampaign" component={NewCampaignFormFirstPage} />
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
