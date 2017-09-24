import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Checkbox } from 'redux-form-material-ui';

class TemplateList extends Component {
  render() {
    return (
      <form>
        <Field name="template1" component={Checkbox} label="Template 1" />
        <Field name="template2" component={Checkbox} label="Template 2" />
        <RaisedButton primary label="Next" containerElement={<Link to={'/dashboard/newcampaign/confirm'} />} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(TemplateList);
