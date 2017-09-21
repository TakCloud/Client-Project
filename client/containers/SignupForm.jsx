import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      send: '',
      reply: '',
      signature: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // Continually updating state based on user input
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.fetchUserData(this.state);
    // On Submit will send state to action - fetchUserData
  }

  render() {
    return (
      <div>
        <form>
          <TextField floatingLabelText="First Name" />
          <TextField floatingLabelText="Last Name" /><br />
          <TextField floatingLabelText="E-mail Address" />
          <TextField floatingLabelText="Confirm E-mail Address" /><br />
          <TextField floatingLabelText="Password" type="password" />
          <TextField floatingLabelText="Confirm Password" type="password" /><br />
          <TextField floatingLabelText="Send as E-mail" /><br />
          <TextField floatingLabelText="Reply to E-mail" /><br />
          <TextField floatingLabelText="E-mail Signature" multiLine /><br />
          <RaisedButton label="Signup" primary />
        </form>
      </div>
    );
  }
}

export default SignupForm;
