import React from 'react';
import React from 'ReactDom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import SettingsTemp from './SettingsTemp';

class LoginForm extends Component {
  state = {}
  tempLoginButtonHandler = () => {
    console.log(this);
    // this currentEmail is currently coming from firstMessage.json
    // but it needs to come from and OAuth id or email buffer
    axios.post('/oauthlogin')
      .then((req, res) => {
        window.location = '/oauth ';
      });
      render() {
      
      return (
        <div>
          <h1>First Freight</h1>
          <form>
            <TextField
              floatingLabelText="Username"
            /><br />
            <TextField
              floatingLabelText="Password"
            /><br />
            <RaisedButton label="Login" primary onClick={this.tempLoginButtonHandler} />
          </form>
        </div>
      );
    }
  }
}
import  LoginForm from './LoginForm';
