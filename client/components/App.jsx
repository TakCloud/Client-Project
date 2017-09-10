import React from 'react';
import axios from 'axios';
import message from '../../client/messages/firstMessage.json';
// import message from './../messages/firstMessage.json';

class App extends React.Component {
  // state = {
  //   message: '',
  // }
  poster = () => {
    // this currentEmail is currently coming from firstMessage.json
    // but it needs to come from and OAuth id or email buffer
    axios.post('/alex', message)
      .then(() => {
        window.location = '/alex ';
      });
  };

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {/* <input type="email" /> */}
        <input type="submit" value="Submit" onClick={this.poster} />
      </div>
    );
  }
}
export default App;
