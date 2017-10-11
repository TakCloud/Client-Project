import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class EditTemplatesTextFields extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Field name="subject" component={TextField} hintText="Subject" />
        <Field name="body" component={TextField} hintText="Body" />
      </div>
    );
  }
}


EditTemplatesTextFields.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'EditTemplatesForm',
  destroyOnUnmount: false,
})(EditTemplatesTextFields);

