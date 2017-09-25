import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default function LoginForm() {
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
        <RaisedButton label="Login" primary />
      </form>
    </div>
  );
}
