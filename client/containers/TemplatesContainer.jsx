import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import EditTemplatesForm from '../containers/EditTemplatesForm';


class TemplatesContainer extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
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
        </Dialog>
      </div>
    );
  }
}

export default TemplatesContainer;
