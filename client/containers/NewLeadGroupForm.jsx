import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { postNewLeadGroup } from '../actions/postNewLeadGroup';


class NewEmailGroupForm extends Component {
  onSubmit = (values) => {
    console.log(values);
    axios.post('/createleadgroup', values)
      .then(() => {
        console.log('hi');
        this.props.history.push('/summary');
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="lead_group_name"
            component={TextField}
            floatingLabelText="Email Group Name"
          />
          <Field
            name="leadgroups_emails"
            component="input"
            type="file"
          />
          <RaisedButton
            type="submit"
            label="Submit"
            primary
          />
        </form>
      </MuiThemeProvider>
    );
  }
}

NewEmailGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
};

export default reduxForm({
  form: 'NewEmailGroupForm',
})(connect(null, { postNewLeadGroup })(NewEmailGroupForm));
