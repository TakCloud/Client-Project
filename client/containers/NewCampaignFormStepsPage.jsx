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


const renderSteps = ({ steps, fields } = PropTypes) => (
  <div className="steps-container">
    <h3 className="first-page-title">Campaign Email</h3>
    <h3 className="first-page-title">Step 1</h3>
    <Field
      name={`${steps}.time_interval`}
      component={DatePicker}
      hintText="Choose Date"
      mode="landscape"
      container="inline"
      format={null}
    />
    <Field
      name={`${steps}.template.subject`}
      component={TextField}
      floatingLabelText="Subject Title"
    /><br />
    <div className="campaign-steps-email-body-container">
      <h5 className="campaign-steps-email-body-title">Email Body</h5>
      <Field
        name="template.subject"
        className="campaign-steps-email-body"
        component="textarea"
        rows="5"
      />
    </div>
    {fields.map((steps, index) => (
      <Paper key={index} zDepth={2} style={{ width: '800px', padding: '20px', marginTop: '20px' }}>
        <div>
          <div>
            <Toolbar>
              <ToolbarTitle text={`STEP ${index + 1}`} />
              <ToolbarGroup style={{ float: 'none' }}>
                <RaisedButton
                  label="Remove Step"
                  onClick={() => fields.remove(index)}
                  style={{ padding: 0 }}
                  secondary
                />
              </ToolbarGroup>
            </Toolbar>
          </div>
          <div>
            <Field
              name={`${steps}.time_interval`}
              component={DatePicker}
              hintText="Choose Date"
              mode="landscape"
              container="inline"
              format={null}
            />
            <Field
              name={`${steps}.template.subject`}
              component={TextField}
              floatingLabelText="Subject"
            /><br />
            <Field
              name={`${steps}.template.body`}
              component={TextField}
              floatingLabelText="Body"
              multiLine
            />
          </div>
        </div>
        <TemplatesContainer />
      </Paper>
    ))}
    <RaisedButton
      className="second-page-add-steps-button"
      label="Save"
      containerElement={<Link to={'/summary/newcampaign/confirm'} />}
      secondary
    /><br />
  </div>
);


const NewCampaignStepsForm = () => {
  return (
    <div className="newcampaign-container">
      <AppBar
        title="Create Email Content"
        className="first-page-header"
        showMenuIconButton={false}
        style={{ height: '100px', backgroundColor: '#2196F3' }}
      />
      <form className="center-items">
        <FieldArray name="steps" component={renderSteps} />
      </form>
    </div>
  );
};


export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(NewCampaignStepsForm);
