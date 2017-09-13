import React from 'react';
import axios from 'axios';
import message from './../messages/firstMessage';

class App extends React.Component {
  state = {
    email: message,
  };
  poster = () => {
    axios.post('/alex', this.state.email)
      .then(() => {
        window.location = '/alex ';
      });
  };

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <input type="submit" value="Submit" onClick={this.poster} />
      </div>
    );
  }
}
export default App;
