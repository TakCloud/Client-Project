import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { fetchUserData } from '../actions/fetchUserData';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // Continually updating state based on user input
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchUserData(this.state);
    // On Submit will send state to action - fetchUserData
  }

  render() {
    return (
      <div>
        <form>
          <TextField
            floatingLabelText="Username"
            name="username"
            onChange={this.handleChange}
          /><br />
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          /><br />
          <RaisedButton onClick={this.handleSubmit} label="Login" primary />
        </form>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  // Built in type-checking method to make sure props are passed down correctly
  fetchUserData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  // Hooking up action creater to LoginForm container
  // Make sure the action - fetchUserData flows down the middleware to reducers
  return bindActionCreators({ fetchUserData }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);
// Connecting to redux state
// Passing in null as a param, means that container does not care about curr state
