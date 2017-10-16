import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';

const EditTemplatesTextFields = (props) => {
  return (
    <div>
      <Field name="subject" component={TextField} hintText="Subject" />
      <Field name="body" component={TextField} hintText="Body" />
    </div>
  );
};

export default reduxForm({
  form: 'EditTemplatesForm',
  destroyOnUnmount: false,
})(EditTemplatesTextFields);

