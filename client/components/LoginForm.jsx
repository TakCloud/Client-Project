import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import SignupForm from './SignupForm';
import Summary from './Summary';

class LoginForm extends React.Component {
  state = {
    userName: '',
    password: '',
    logged: false,
  }
  userNameHandler = (e) => {
    this.setState({ userName: e.target.value });
  }
  passwordHandler = (e) => {
    this.setState({ password: e.target.value });
  }
  loginClickHandler = (e) => {
    e.preventDefault();
    const data = { userName: this.state.userName, password: this.state.password };
    axios.post('/login', data).then((res) => {
      console.log(res, ' this is the promised response');
      if (res) {
        this.setState({ logged: true });
      }
      console.log(this.state.logged, ' this is this.logged');
      // window.location = '/summary';
    });
  }
  render() {
    if (this.state.logged) {
      return (
        <Redirect to="/summary" component={Summary} />
      );
    }
    return (
      <Router >
        <div>
          <h1>First Freight</h1>
          <form>
            <TextField floatingLabelText="Username" value={this.state.userName} onChange={this.userNameHandler} />
            <br />
            <TextField floatingLabelText="Password" value={this.state.password} onChange={this.passwordHandler} />
            <br />
            <p>{"Don't have an account?"}</p><Link to="/signup" component={SignupForm}>Sign up</Link>
            <br />
            <RaisedButton label="Login" onClick={this.loginClickHandler} />
            <br />
          </form>
        </div>
      </Router>
    );
  }
}

module.exports = LoginForm;
