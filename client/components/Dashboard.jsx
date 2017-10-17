import React, { Component } from 'react';
import TopNavbar from './TopNavbar';
import DataViews from './DataViews';
import BottomButtons from './BottomButtons';
import CampaignButtons from '../containers/CampaignButtons';

const Dashboard = () => {
  return (
    <div>
      <TopNavbar />
      <CampaignButtons />
      <BottomButtons />
    </div>
  );
};


export default Dashboard;
