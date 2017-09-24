import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

class NewCampaignFormFirstPage extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <form>
          <Field
            name="campaign_name"
            component={TextField}
            floatingLabelText="Campaign Name"
          />
          <Field name="lead_group" component={RadioButtonGroup}>
            <RadioButton value={1} label="Group1" />
            <RadioButton value={2} label="Group2" />
          </Field>
          <RaisedButton primary label="Next" containerElement={<Link to={'/dashboard/newcampaign/steps'} />} />
        </form>
      </MuiThemeProvider>
    );
  }
}

NewCampaignFormFirstPage.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(NewCampaignFormFirstPage);


// PostsEdit new form, would cause form from PostsEdit to merge into antoher form
// Multi-page form will have the same name in reduxForm
