import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

class CreateTemplate extends Component {
  onSubmit = (values) => {
    this.props.history.push('/dashboard/newcampaign/template');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h3>New Template</h3>
          <Field
            name="name"
            component={TextField}
            floatingLabelText="Template Name"
          /><br />
          <Field
            name="subject"
            component={TextField}
            floatingLabelText="Subject"
          /><br />
          <Field
            name="body"
            component={TextField}
            floatingLabelText="Body"
            multiLine
            rows={2}
          />
          <h3>Would you like to save the template?</h3>
          <Field name="save" component={RadioButtonGroup}>
            <RadioButton value="true" label="Yes" />
            <RadioButton value="false" label="No" />
          </Field>
          <RaisedButton type="submit" primary label="Save" />
          <RaisedButton secondary onClick={this.resetForm} label="Reset" />
        </form>
      </MuiThemeProvider>
    );
  }
}

CreateTemplate.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.func),
};

export default reduxForm({
  form: 'NewTemplateForm',
  destroyOnUnmount: false,
})(CreateTemplate);
