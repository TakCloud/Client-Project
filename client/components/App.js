import React from 'react';
import { Component } from 'react';
import axios from 'axios';
// import message from 

class App extends Component {
  state = {
    email: 'https://mail.google.com/mail/u/0/?ui=2&ik=86e224004a&jsver=EfWGX3tyASk.en.&view=om&th=15e53d361fd8eec2'
  }
  poster = (e) => {
    axios.post('http://localhost:3000/alex', this.state.email)
      .then((response) => {
        console.log('this is response');
        window.location = '/alex';
      });
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <input type="submit" value="Submit" onClick={this.poster}/>
      </div>
    );
  }
}
export default App;
