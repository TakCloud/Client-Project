import React from 'react';
import RaisedButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

export default function BottomButtons() {
  return (
    <div className="botDashboardButtonsContainer">
      <RaisedButton
        className="botDashboardButtons"
        label="Create New"
        containerElement={<Link to={'/summary/newcampaign'} />}
        primary
      />
      <RaisedButton
        className="botDashboardButtons"
        label="Campaign History"
        primary
      />
    </div>
  );
}
