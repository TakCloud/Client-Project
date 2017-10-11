import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import EditTemplatesForm from '../containers/EditTemplatesForm';


class TemplatesContainer extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <RaisedButton label="Edit Templates" onClick={this.handleOpen} />
        <Dialog
          title="Templates"
          open={this.state.open}
        >
          <EditTemplatesForm />
          <FlatButton
            label="Save"
            primary
            onClick={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

export default TemplatesContainer;
