import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Summary from './Summary';
import oauthForm from './oauthForm';
import SettingsTemp from './SettingsTemp';
import Image from './Image';

class App extends React.Component {
  state = {};
  //  this logic needs to be fore 
  // temporary setting
  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Route exact path="/" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/summary" component={Summary} />
            <Route path="/summary/image" component={Image} />
            <Route exact path="/oauth" component={oauthForm} />
            <Route path="/settings" component={SettingsTemp} />
            <br />
          </div>
        </Switch>
      </Router>
    );
  }
}
module.exports = App;
