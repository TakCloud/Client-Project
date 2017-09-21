import React from 'react';
import RaisedButton from 'material-ui/FlatButton';

export default function BottomButtons() {
  return (
    <div>
      <RaisedButton className="botDashboardButtons" label="Create New" primary />
      <RaisedButton className="botDashboardButtons" label="Campaign History" primary />
    </div>
  );
}
