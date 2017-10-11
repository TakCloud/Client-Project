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
  renderLeadRadioButtons() {
    return this.props.leadGroups.map(lead => (
      <RadioButton className="first-page-select-group-radio-buttons" value={lead.leadgroup_id} label={lead.leadgroup_name} />
    ));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="newcampaign-container">
        <AppBar
          title="New Campaign"
          className="first-page-header"
          showMenuIconButton={false}
          style={{ height: '100px', backgroundColor: '#607D8B' }}
        />
        <form className="center-items">
          <Field
            name="campaign_name"
            className="campaign-field"
            component={TextField}
            hintText="Campaign Name"
            style={{ fontSize: '30px', width: '350px' }}
            inputStyle={{ textAlign: 'center', fontSize: '20px' }}
            hintStyle={{ textAlign: 'center', paddingLeft: '70px', marginTop: '40px' }}
          />
          <div className="first-page-radiobuttons-container">
            <h3 className="first-page-title">Select Group</h3>
            <Field name="lead_group" className="first-page-radiobuttons" component={RadioButtonGroup}>
              {this.renderLeadRadioButtons()}
            </Field>
          </div>
          <FlatButton
            label="Add New Email Group"
            primary
          />
        </form>
        <RaisedButton
          label="Next"
          primary
          className="campaign-form-next-buttons"
          containerElement={<Link to={'/summary/newcampaign/steps'} />}
        />
        {/* <div className="newcampaign-footer"> */}
        {/* <Link */}
        {/* className="newcampaign-footer-btn" */}
        {/* to="/newgroup" */}
        {/* >Add New Email Group</Link> */}
        {/* <Link */}
        {/* className="newcampaign-footer-btn" */}
        {/* to="/summary/newcampaign/steps" */}
        {/* >Next</Link> */}
        {/* </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { leadGroups: state.leadGroups };
}

NewCampaignFormFirstPage.propTypes = {
  handleSubmit: PropTypes.func,
  leadGroups: PropTypes.array,
};

export default reduxForm({
  form: 'NewCampaignForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps)(NewCampaignFormFirstPage));

