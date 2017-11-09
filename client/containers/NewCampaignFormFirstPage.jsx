import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect, change } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


class NewCampaignFormFirstPage extends Component {
    handleRadioButtonChange = (event, newVal) => {
      event.preventDefault();
      this.props.dispatch(change('NewCampaignForm', 'lead_group_id', newVal));
    }
    renderLeadRadioButtons() {
      return this.props.leadGroups.map((lead, index) => (
        <RadioButton
          className="first-page-select-group-radio-buttons"
          value={lead.leadgroup_id}
          label={lead.leadgroup_name}
          onChange={this.handleRadioButtonChange}
          key={index}
        />
      ));
    }

    render() {
      return (
        <div className="newcampaign-container">
          <AppBar
            title="New Campaign"
            className="first-page-header"
            showMenuIconButton={false}
            style={{ height: '100px', backgroundColor: '#2196F3' }}
          />
          <form className="newcampaign-form">
            <Field
              name="campaign_name"
              className="campaign-field"
              component={TextField}
              hintText="Campaign Name"
              hintStyle={{ fontSize: '25px' }}
              style={{ fontSize: '5px' }}
            />
            <div className="first-page-radiobuttons-container">
              <h3 className="first-page-title">Select Recipient Group: </h3>
              <Field
                name="lead_group"
                className="first-page-radiobuttons"
                component={RadioButtonGroup}
                onChange={this.handleRadioButtonChange}
              >
                {this.renderLeadRadioButtons()}
              </Field>
            </div>
            <RaisedButton
              label="Add New Email Group"
              primary
              className="add-new-email"
              containerElement={<Link to={'/newgroup'} />}
            />
            <RaisedButton
              label="Next"
              secondary
              className="campaign-form-next-buttons"
              containerElement={<Link to={'/summary/newcampaign/steps'} />}
            />
          </form>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return { leadGroups: state.leadGroups };
}

NewCampaignFormFirstPage.propTypes = {
  leadGroups: PropTypes.array,
  dispatch: PropTypes.func,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps)(NewCampaignFormFirstPage));
