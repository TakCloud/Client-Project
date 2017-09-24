import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class EditTemplates extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton primary label="Template 1" /><br />
        <RaisedButton primary label="Template 2" /><br />
        <FloatingActionButton containerElement={<Link to={'/dashboard/newcampaign/template/new'} />}>
          <ContentAdd />
        </FloatingActionButton>
      </MuiThemeProvider>
    );
  }
}
