import React, { Component } from 'react';
import axios from 'axios';
// import RaisedButton from 'material-ui/RaisedButton';
// import Summary from './Summary';
// import { Redirect } from 'react-router-dom';

class TempSettingsPage extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/oauthlogin').then((res) => {
      console.log('res after oauth was hit', res.data.authUrl);
      window.location = res.data.authUrl;
    });
  };
  render() {
    return (
      <div>
        {/* <RaisedButton label="oauthlogin" primary onClick={this.validator} /> */}
        <button id="submit" type="submit" onClick={this.validator}>LOGIN WITH OAUTH</button>
      </div>
    );
  }
}

export default TempSettingsPage;
