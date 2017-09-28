import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField, RadioButtonGroup, RadioButton } from 'redux-form-material-ui';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TemplatesContainer from './TemplatesContainer';


const renderSteps = ({ fields } = PropTypes) => (
  <div>
    {fields.map((steps, index) => (
      <Paper className="stepsContainer" zDepth={2}>
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
          <div className="stepsFieldContainer">
            <Field
              name={`${steps}.time_interval`}
              component={DatePicker}
              hintText="Choose Date"
              mode="landscape"
              container="inline"
              format={null}
            />
            <Field name={`${steps}.template.name`} component={RadioButtonGroup}>
              <RadioButton value="Best Template" label="Template 1" />
              <RadioButton value="Worst Template" label="Template 2" />
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
      </Paper>
    ))}
    <TemplatesContainer />
    <RaisedButton
      className="addStepsButton"
      label="Add Step"
      onClick={() => fields.push({})}
      secondary
    /><br />
  </div>
);


const NewCampaignStepsForm = (props) => {
  const { handleSubmit } = props;
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="CAMPAIGN STEPS"
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center' }}
        />
        <form>
          <FieldArray name="steps" component={renderSteps} />
          <RaisedButton
            className="confirmStepsButton"
            label="Next"
            containerElement={<Link to={'/summary/newcampaign/confirm'} />}
            primary
          />
        </form>
      </div>
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
