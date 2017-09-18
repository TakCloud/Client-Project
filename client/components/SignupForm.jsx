import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default function SignupForm() {
  return (
    <div>
      <h1>First Freight</h1>
      <form>
        <TextField
          floatingLabelText="New Username"
        /><br />
        <TextField
          floatingLabelText="New Password"
        /><br />
        <RaisedButton label="Signup" primary />
      </form>
    </div>
  );
}
