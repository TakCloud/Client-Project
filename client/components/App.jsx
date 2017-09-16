import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class App extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/login').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <p>{"Don't have an account?"}</p><Link to="/signup" component={SignupForm}>Sign up</Link>
        </div>
      </Router>
    );
  }
}
export default App;
