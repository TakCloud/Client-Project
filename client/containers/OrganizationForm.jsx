import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { postOrganizationData } from '../actions/postOrganizationData';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_name: '',
      primary_contact_email: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postOrganizationData(this.state);
  }

  render() {
    return (
      <form>
        <TextField
          floatingLabelText="Organization Name"
          name="organization_name"
          onChange={this.handleChange}
        /><br />
        <TextField
          floatingLabelText="Primary Contact Email"
          name="primary_contact_email"
          onChange={this.handleChange}
        /><br />
        <RaisedButton onClick={this.handleSubmit} label="Submit" primary />
      </form>
    );
  }
}

OrganizationForm.propTypes = {
  postOrganizationData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postOrganizationData }, dispatch);
}


export default connect(null, mapDispatchToProps)(OrganizationForm);
