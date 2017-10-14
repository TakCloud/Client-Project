import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField, RadioButtonGroup, RadioButton } from 'redux-form-material-ui';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TemplatesContainer from './TemplatesContainer';


const renderSteps = ({ fields } = PropTypes) => (
  <div className="steps-container">
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
            <Field name={`${steps}.template.name`} component={RadioButtonGroup}>
              <RadioButton value="Best Template" label="New Leads Template" />
              <RadioButton value="Worst Template" label="Current Customers Template" />
            </Field>
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
      label="Add Step"
      onClick={() => fields.push({})}
      secondary
    /><br />
  </div>
);


const NewCampaignStepsForm = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="newcampaign-container">
      <AppBar
        title="Campaign Steps"
        className="first-page-header"
        showMenuIconButton={false}
        titleStyle={{ textAlign: 'center' }}
        style={{ height: '100px', backgroundColor: '#2196F3' }}
      />
      <form className="center-items">
        <FieldArray name="steps" component={renderSteps} />
        <RaisedButton
          className="confirmStepsButton"
          label="Next"
          containerElement={<Link to={'/summary/newcampaign/confirm'} />}
          primary
        />
      </form>
    </div>
  );
};


NewCampaignStepsForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(NewCampaignStepsForm);
