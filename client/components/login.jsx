import React, { Component } from 'react';
import App from './App';

class Login extends Component {
  state = {
    users: [],
    pass: [],
    validated: false,
    signup: false,
  }
  validator = () => {
    this.setState({ validated: true, signup: false });
    console.log(this.state.validated, 'this is validated');
  };
  signupPage = () => {
    this.setState({ signup: true });
    console.log(this.state.signup, 'this is signup');
  };
  render() {
    if (this.state.signup) {
      return (
        <div>
          <form id="signup" action="/signup" method="POST">
            <input id="user" name="user" placeholder="user" type="text" />
            <br />
            <input id="pass" name="pass" placeholder="pass" type="text" />
            <br />
            <button id="submit" type="submit">Sign Up!!</button>
          </form>
        </div>
      );
    }
    if (this.state.validated) {
      return (
        <App />
      );
    }
    return (
      <div>
        <form id="login" action="/login" method="POST">
          <input id="user" name="user" placeholder="user" type="text" />
          <br />
          <input id="pass" name="pass" placeholder="pass" type="text" />
          <br />
          <button id="submit" type="submit" onClick={this.validator}>Log In</button>
        </form>
        <div id="signup-link">
          <span>
            If you do not have an acount? <button id="submit" type="submit" onClick={this.signupPage}>Sign Up!!</button>
          </span>
        </div>
      </div>
    );
  }
}
export default Login;
