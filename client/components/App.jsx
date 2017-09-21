import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import OrganizationForm from '../containers/OrganizationForm';
import PieChart from '../containers/PieChart';

class App extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/login').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <MuiThemeProvider>
              <Route path="/dashboard" component={Dashboard} />
            </MuiThemeProvider>
            <Route path="/dashboard/:id" component={PieChart} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/neworg" component={OrganizationForm} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
