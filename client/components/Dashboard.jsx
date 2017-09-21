import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopNavbar from './TopNavbar';
import DataViews from './DataViews';
import BottomButtons from './BottomButtons';
import ButtonList from '../containers/ButtonList';
import PieCharts from '../containers/PieCharts';


export default class Dashboard extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopNavbar />
          <DataViews />
          <ButtonList />
          <BottomButtons />
        </div>
      </MuiThemeProvider>
    );
  }
}
