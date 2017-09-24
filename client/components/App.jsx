import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './Dashboard';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import OrganizationForm from '../containers/OrganizationForm';
import CreateTemplate from '../containers/CreateTemplate';

class App extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/oauthlogin').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  emailSender = (e) => {
    e.preventDefault();
    axios.post('/sendmail');
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <MuiThemeProvider>
              <Route path="/dashboard" component={Dashboard} />
            </MuiThemeProvider>
            <Route path="/signup" component={SignupForm} />
            <Route path="/neworg" component={OrganizationForm} />
            <Route path="/" component={Dashboard} />
          </Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <button id="submit" type="submit" onClick={this.validator}>LOGIN</button>
          <button id="sendmail" type="sendmail" onClick={this.emailSender}>SEND MAIL</button>
          <p>{"Don't have an account?"}</p><Link to="/signup" component={SignupForm}>Sign up</Link>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
