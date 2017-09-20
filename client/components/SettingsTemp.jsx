import React, { Component } from 'react';
import axios from 'axios';


class TempSettingsPage extends Component {
  emailSender = (e) => {
    e.preventDefault();
    axios.post('/sendmail');
  };
  render() {
    return (
      <div>
        <button id="sendmail" type="submit" onClick={this.emailSender}>SEND CAMPAIGN</button>
      </div>
    );
  }
}

export default TempSettingsPage;
