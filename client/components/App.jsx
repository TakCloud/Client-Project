import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    email: 'https://mail.google.com/mail/u/0/?ui=2&ik=86e224004a&jsver=EfWGX3tyASk.en.&view=om&th=15e53d361fd8eec2',
  }
  poster = () => {
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
