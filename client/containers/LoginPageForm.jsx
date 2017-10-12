import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchUserData } from '../actions/fetchUserData';

class LoginPageForm extends Component {
  onSubmit = (values) => {
    this.props.fetchUserData(values, () => this.props.history.push('/summary'));
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            component={TextField}
            floatingLabelText="Username"
          />
          <Field
            name="password"
            component={TextField}
            floatingLabelText="Password"
          />
          <RaisedButton
            type="submit"
            label="Submit"
            primary
          />
        </form>
        <RaisedButton
          name="signup"
          label="Sign Up"
          primary
          containerElement={<Link to={'/neworganization'} />}
        />
      </div>
    );
  }
}

LoginPageForm.propTypes = {
  handleSubmit: PropTypes.func,
  fetchUserData: PropTypes.func,
  history: PropTypes.object,
};

export default reduxForm({
  form: 'UserLoginForm',
  destroyOnUnmount: true,
})(connect(null, { fetchUserData })(LoginPageForm));
