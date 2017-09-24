import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TimePicker } from 'redux-form-material-ui';

class CampaignSteps extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <form>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Step1" />
              <Field name="DaySent" component={DatePicker} hintText="Choose Date" container="inline" mode="landscape" />
              <Field name="TimeSent" component={TimePicker} defaultValue={null} hintText="Choose Time" />
              <ToolbarSeparator />
            </ToolbarGroup>
          </Toolbar>
        </form>
      </MuiThemeProvider>
    );
  }
}

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(CampaignSteps);
