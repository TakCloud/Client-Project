import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class NewCampaignFormFirstPage extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="NEW CAMPAIGN"
            showMenuIconButton={false}
            titleStyle={{ textAlign: 'center' }}
          />
          <form>
            <Field
              name="campaign_name"
              className="firstPageFields"
              component={TextField}
              floatingLabelText="Campaign Name"
            />
            <h3 className="firstPageTitle">Select Group</h3>
            <Field name="lead_group" className="firstPageFields" component={RadioButtonGroup}>
              <RadioButton value={1} label="Codesmith" />
              <RadioButton value={2} label="VIP" />
            </Field>
          </form>
          <RaisedButton
            className="firstPageButton"
            label="Next"
            containerElement={<Link to={'/summary/newcampaign/steps'} />}
            primary
          />
        </div>
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
