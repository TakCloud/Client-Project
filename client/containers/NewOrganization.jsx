import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { postNewOrg } from '../actions/postNewOrg';

class NewOrganization extends Component {
  // onSubmit needs to make post request to server to have new organization and primary
  // user created at the same time.  Once created, they need to be sent to the
  // summary page.
  // a new action needs to be created to make the post with the data and then
  // a callback needs to be invoked to take them to the summary page.

  onSubmit = (values) => {
    this.props.postNewOrg(values, () => this.props.history.push('/summary'),
    /* this.props.history.push('/summary') */);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <center>
          <h1>New Organization</h1>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="organization_name"
              component={TextField}
              floatingLabelText="Organization Name"
            /><br />
            <Field
              name="primary_contact_email"
              component={TextField}
              floatingLabelText="Primary Email Address"
            /><br />
            <Field
              name="first_name"
              component={TextField}
              floatingLabelText="First Name"
            /><br />
            <Field
              name="last_name"
              component={TextField}
              floatingLabelText="Last Name"
            /><br />
            <Field
              name="user_password"
              component={TextField}
              floatingLabelText="Password"
            /><br />
            <Field
              name="confirm_password"
              component={TextField}
              floatingLabelText="Confirm Password"
            /><br />
            <RaisedButton
              type="submit"
              label="Submit"
              primary
            />
          </form>
        </center>
      </MuiThemeProvider>
    );
  }
}

NewOrganization.propTypes = {
  handleSubmit: PropTypes.func,
  postNewOrg: PropTypes.func,
  history: PropTypes.object,
};

export default reduxForm({
  form: 'NewOrganization',
  destroyOnUnmount: true,
})(connect(null, { postNewOrg })(NewOrganization));
