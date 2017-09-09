import React, { Component } from 'react';
import axios from 'axios';
import App from './App';

class Login extends Component {
  state = {
    users: [],
    passes: [],
    userSign: '',
    passSign: '',
    userLog: '',
    passLog: '',
    validated: false,
    signup: false,
  }
  handlerChangeUserSign = (e) => {
    this.setState({ userSign: e.target.value });
  };
  handlerChangePassSign = (e) => {
    this.setState({ passSign: e.target.value });
  };
  handlerChangeUserLog = (e) => {
    this.setState({ userLog: e.target.value });
  };
  handlerChangePassLog = (e) => {
    this.setState({ passLog: e.target.value });
  };
  validator = (e) => {
    e.preventDefault();
    const data = {
      cookieSetter: {
        user: this.state.userLog,
        pass: this.state.passLog,
        _id: '23423423432',
      },
    };
    axios.post('/login', data).then(() => {
      this.setState({ validated: true });
    });
  };
  signed = () => {
    this.setState({ signup: false, userSign: '', passSign: '' });
    const data = {
      modifications: {
        user: this.state.userSign,
        pass: this.state.passSign,
        _id: '',
      },
    };
    axios.post('/signup', data);
  };
  signupPage = () => {
    this.setState({ signup: true });
  };
  render() {
    if (this.state.signup) {
      return (
        <div>
          <form id="signup">
            <input id="user" name="user" placeholder="user" type="text" onChange={this.handlerChangeUserSign} />
            <br />
            <input id="pass" name="pass" placeholder="pass" type="text" onChange={this.handlerChangePassSign} />
            <br />
            <button id="submit" type="submit" onClick={this.signed}>Sign Up!!</button>
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
        <form id="login">
          <input id="user" name="user" placeholder="user" type="text" onChange={this.handlerChangeUserLog} />
          <br />
          <input id="pass" name="pass" placeholder="pass" type="text" onChange={this.handlerChangePassLog} />
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
