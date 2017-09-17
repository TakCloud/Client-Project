import React, { Component } from 'react';
import axios from 'axios';


class TempSettingsPage extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/oauthlogin').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  emailSender = (e) => {
    e.preventDefault();
    axios.post('/sendmail');
  };
  render() {
    return (
      <div>
        <button id="submit" type="submit" onClick={this.validator}>LOGIN WITH OAUTH</button>
        <button id="sendmail" type="submit" onClick={this.emailSender}>SEND CAMPAIGN</button>
      </div>
    );
  }
}

export default TempSettingsPage;
