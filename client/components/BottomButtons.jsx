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
      <RaisedButton
        name="gmail"
        label="Login With Gmail"
        primary
        onClick={() => { window.location = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fmail.google.com%2F&response_type=code&client_id=674930641729-at55ett8pbck27uu5ektiniq91bu8dfd.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcodesmithnodejs.azurewebsites.net%2Fsummary'; }}
        style={{ position: 'right' }}
      />
    </div>
  );
}
