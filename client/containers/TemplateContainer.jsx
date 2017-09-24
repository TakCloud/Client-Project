import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TemplateList from './TemplateList';

class TemplateContainer extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TemplateList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TemplateContainer;
