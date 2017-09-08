import React from 'react';
import axios from 'axios';
import message from './firstMessage';

class App extends React.Component {
  state = {
    email: message,
  };
  poster = () => {
    console.log('this is this.state.email,', this.state.email)
    axios.post('/alex', this.state.email)
      .then(() => {
        // console.log('this is response', response);
        window.location = '/alex ';
      });
  }

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
