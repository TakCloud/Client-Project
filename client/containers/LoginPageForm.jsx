import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class LoginPageForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form>
        <Field
          name="username"
          component={TextField}
          label="Username"
        />
        <Field
          name="password"
          component={TextField}
          label="Password"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'UserLoginForm',
  destroyOnUnmount: true,
});
