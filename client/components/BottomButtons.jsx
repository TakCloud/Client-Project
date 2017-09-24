import React from 'react';
import RaisedButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

export default function BottomButtons() {
  return (
    <div className="botDashboardButtonsContainer">
      <RaisedButton className="botDashboardButtons" label="Create New" primary containerElement={<Link to={'/dashboard/newcampaign'} />} />
      <RaisedButton className="botDashboardButtons" label="Campaign History" primary />
    </div>
  );
}
