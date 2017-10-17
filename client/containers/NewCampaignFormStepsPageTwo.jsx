import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField, RadioButton } from 'redux-form-material-ui';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TemplatesContainer from './TemplatesContainer';


const NewCampaignFormStepsPageTwo = () => {
  return (
    <div className="newcampaign-container">
      <AppBar
        title="Create Email Content"
        className="first-page-header"
        showMenuIconButton={false}
        style={{ height: '100px', backgroundColor: '#2196F3' }}
      />
      <form className="center-items">
        <Field
          name="time_interval"
          component={DatePicker}
          hintText="Choose Date"
          mode="landscape"
          container="inline"
          format={null}
        />
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(NewCampaignFormStepsPageTwo);
