import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
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
      <div className="newcampaign-container">
        <AppBar
          title="Campaign Summary"
          className="first-page-header"
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center' }}
          style={{ height: '100px', backgroundColor: '#2196F3' }}
        />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <RaisedButton
            type="submit"
            label="Confirm"
            primary
          />
        </form>
      </div>
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
