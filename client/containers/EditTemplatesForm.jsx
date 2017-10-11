import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, selector } from 'redux-form';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButtonGroup } from 'redux-form-material-ui';
import RadioButton from 'material-ui/RadioButton';
import EditTemplatesTextFields from './EditTemplatesTextFields';
import { postTemplate } from '../actions/postTemplate';

class EditTemplatesForm extends Component {
  state = {
    selectedRadio: null,
  }
  onSubmit = (values) => {
    const templateObj = values;
    const currentTemplate = this.props.userTemplates.find((template) => {
      return Number(template.template_id) === Number(values.template_id);
    });
    templateObj.template_name = currentTemplate.template_name;
    templateObj.user_id = '1';
    this.props.postTemplate(templateObj);
  }
  handleRadioButtonChange = (event, newVal) => {
    event.preventDefault();
    this.setState({ selectedRadio: newVal });
    this.props.dispatch(change('EditTemplatesForm', 'template_id', newVal));
  }
  renderTemplateRadioButtons() {
    return this.props.userTemplates.map((template, index) => (
      <RadioButton value={template.template_id} label={template.template_name} />
    ));
  }
  render() {
    const selectedTemplate = this.state.selectedRadio ?
      this.props.userTemplates.find((element) => {
        return Number(element.template_id) === Number(this.state.selectedRadio);
      })
      : null;
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field name="template_id" component={RadioButtonGroup} onChange={this.handleRadioButtonChange}>
              {this.renderTemplateRadioButtons()}
            </Field>
            <div>
              {selectedTemplate ? (
                <EditTemplatesTextFields templates={this.props.userTemplates} />
              ) : null }
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    userTemplates: state.userFakeTemplates.templates,
    postTemplate,
  };
}

EditTemplatesForm.propTypes = {
  userTemplates: PropTypes.array,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  postTemplate: PropTypes.func,
};

export default reduxForm({
  form: 'EditTemplatesForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps)(EditTemplatesForm));
