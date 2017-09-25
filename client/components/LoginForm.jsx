import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default function LoginForm() {
  return (
    <div>
      <h1>First Freight</h1>
      <form>
        <button id="submit" type="submit" onClick={this.validator}>OAUTH LOGIN</button>
        <button id="sendmail" type="sendmail" onClick={this.emailSender}>SEND MAIL</button>
        <TextField
          floatingLabelText="Username"
        /><br />
        <TextField
          floatingLabelText="Password"
        /><br />
        <RaisedButton label="Login" primary />
      </form>
    </div>
  );
}
