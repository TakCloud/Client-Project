import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { postNewCampaign } from '../actions/postNewCampaign';

const selector = formValueSelector('NewCampaignForm');


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

  renderCampaignStepsPreview = () => {
    return this.props.campaignSteps.map((step, index) => (
      <div key={index}>
        {`STEP ${index + 1}`}
        {step.template.subject}
        {step.template.body}
        {step.template.subject}
        {String(step.time_interval)}
      </div>
    ));
  }
  render() {
    const { handleSubmit, campaignName, campaignEmailGroup } = this.props;
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
        <div>
          Campaign Name: {campaignName}
          Group Selected: {campaignEmailGroup}
          {this.renderCampaignStepsPreview()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const campaignName = selector(state, 'campaign_name');
  const campaignSteps = selector(state, 'steps');
  const campaignEmailGroup = selector(state, 'lead_group_id');
  return {
    campaignName,
    campaignSteps,
    campaignEmailGroup,
    userTemplates: state.userFakeTemplates,
  };
}

NewCampaignFormConfirmationPage.propTypes = {
  handleSubmit: PropTypes.func,
  postNewCampaign: PropTypes.func,
  history: PropTypes.object,
  campaignName: PropTypes.string,
  campaignSteps: PropTypes.array,
  campaignEmailGroup: PropTypes.string,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps, { postNewCampaign })(NewCampaignFormConfirmationPage));
