import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DescriptionButton from 'material-ui/svg-icons/action/description';
import Popover from 'material-ui/Popover';
import EditTemplates from '../containers/EditTemplates';


class TemplatesContainer extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  // renderTemplateButtons() {
  //   return this.props.userTemplates.map(template => (
  //     <IconButton>
  //       <DescriptionButton />
  //     </IconButton>
  //   ));
  // }


  render() {
    return (
      <div>
        <RaisedButton label="Choose Template" onClick={this.handleOpen} />
        <Dialog
          title="Choose Template"
          open={this.state.open}
        >
          <EditTemplates />
        </Dialog>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { userTemplates: state.userTemplates.templates };
// }

// TemplatesContainer.propTypes = {
//   userTemplates: PropTypes.array,
// };

export default TemplatesContainer;
