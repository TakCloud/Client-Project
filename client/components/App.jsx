import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  validator = (e) => {
    e.preventDefault();
    axios.post('/login').then((res) => {
      window.location = res.data.authUrl;
    });
  };
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button id="submit" type="submit" onClick={this.validator}>Sign Up!!</button>
      </div>
    );
  }
}
export default App;
