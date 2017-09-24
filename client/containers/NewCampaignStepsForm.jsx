import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField, RadioButtonGroup, RadioButton } from 'redux-form-material-ui';


const renderSteps = ({ fields }) => (
  <div>
    {fields.map((steps, index) => (
      <div>
        <div>
          <Toolbar>
            <ToolbarTitle text={`Step ${index + 1}`} />
            <RaisedButton secondary label="Remove Step" onClick={() => fields.remove(index)} />
          </Toolbar>
        </div>
        <Field
          name={`${steps}.time_interval`}
          component={DatePicker}
          hintText="Choose Date"
          mode="landscape"
          container="inline"
          format={null}
        />
        <Field
          name={`${steps}.template.name`}
          component={TextField}
          floatingLabelText="Template Name"
        /><br />
        <Field
          name={`${steps}.template.subject`}
          component={TextField}
          floatingLabelText="Subject"
        /><br />
        <Field
          name={`${steps}.template.body`}
          component={TextField}
          floatingLabelText="Body"
        />
      </div>
    ))}
    <RaisedButton
      primary
      label="Add Step"
      onClick={() => fields.push({})}
    /><br />
  </div>
);


const NewCampaignStepsForm = (props) => {
  const { handleSubmit } = props;
  return (
    <MuiThemeProvider>
      <form>
        <FieldArray name="steps" component={renderSteps} />
        <RaisedButton primary label="Confirm" containerElement={<Link to={'/dashboard/newcampaign/confirm'} />} />
      </form>
    </MuiThemeProvider>
  );
};

NewCampaignStepsForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(NewCampaignStepsForm);
