import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class NewCampaignFormFirstPage extends Component {
  handleRadioButtonChange = (event, newVal) => {
    event.preventDefault();
    console.log('HELLO');
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
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps)(NewCampaignFormFirstPage));

