import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { postNewCampaign } from '../actions/postNewCampaign';

class NewCampaignFormConfirmationPage extends Component {
  onSubmit = (values) => {
    const valObj = values;
    valObj.status = 'active';
    valObj.steps.forEach((e, index) => {
      e.step_number = String(index + 1);
      e.template.save = false;
    });
    valObj.user_id = '1';
    valObj.start_date = valObj.steps[0].time_interval;
    this.props.postNewCampaign(valObj, () => this.props.history.push('/summary'));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="CAMPAIGN SUMMARY"
            showMenuIconButton={false}
            titleStyle={{ textAlign: 'center' }}
          />
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <RaisedButton
              className="lastPageButton"
              type="submit"
              label="Confirm"
              primary
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

NewCampaignFormConfirmationPage.propTypes = {
  handleSubmit: PropTypes.func,
  postNewCampaign: PropTypes.func,
  history: PropTypes.object,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(connect(null, { postNewCampaign })(NewCampaignFormConfirmationPage));
