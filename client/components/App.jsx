import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/oauthlogin').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  emailSender = (e) => {
    e.preventDefault();
    axios.post('/sendmail');
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button id="submit" type="submit" onClick={this.validator}>LOGIN</button>
        <button id="sendmail" type="sendmail" onClick={this.emailSender}>SEND MAIL</button>
      </div>
    );
  }
}
export default App;
