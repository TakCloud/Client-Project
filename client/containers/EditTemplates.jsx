import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import DescriptionButton from 'material-ui/svg-icons/action/description';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class EditTemplates extends Component {
  state = {
    open: false,
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderTemplateButtons() {
    return this.props.userTemplates.map(template => (
      <IconButton key={template.template_id}>
        <DescriptionButton onClick={this.handleTouchTap} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <TextField
            id="text-field-subject"
            defaultValue={template.subject}
          />
          <Divider />
          <TextField
            id="text-field-body"
            defaultValue={template.body}
          />
        </Popover>
      </IconButton>
    ));
  }

  render() {
    return (
      <div>
        {this.renderTemplateButtons()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userTemplates: state.userTemplates.templates };
}


EditTemplates.propTypes = {
  userTemplates: PropTypes.array,
};

export default connect(mapStateToProps)(EditTemplates);
