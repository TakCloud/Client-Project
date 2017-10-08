import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopNavbar from './TopNavbar';
import DataViews from './DataViews';
import BottomButtons from './BottomButtons';
import CampaignButtons from '../containers/CampaignButtons';

export default class Dashboard extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopNavbar />
          <DataViews />
          <CampaignButtons />
          <BottomButtons />
        </div>
      </MuiThemeProvider>
    );
  }
}
