import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

class TemplatesContainer extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }
  render() {
    const actions = [
      <Dialog
        title="Choose Template"
        modal
        open={this.state.open}
      >
        HELLO
      </Dialog>,
    ];

    return (
      <div>
        <RaisedButton label="Choose Template" onClick={this.handleOpen} />
        <Dialog
          title="Choose Template"
          modal
          open={this.state.open}
          actions={actions}
        >
          HELLO
        </Dialog>
      </div>
    );
  }
}

export default TemplatesContainer;
