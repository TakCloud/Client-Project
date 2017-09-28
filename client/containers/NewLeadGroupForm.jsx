import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { postNewLeadGroup } from '../actions/postNewLeadGroup';


class NewEmailGroupForm extends Component {
  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="leadgroup_name"
            component={TextField}
            floatingLabelText="Email Group Name"
          />
          <Field
            name="leadgroups_emails"
            component="input"
            type="file"
          />
          <RaisedButton
            type="submit"
            lable="Submit"
            primary
          />
        </form>
      </MuiThemeProvider>
    );
  }
}

NewEmailGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'NewEmailGroupForm',
})(connect(null, { postNewLeadGroup })(NewEmailGroupForm));
