import React from 'react';
import { Route } from 'react-router-dom';
import OauthForm from './oauthForm';
import SettingsTemp from './SettingsTemp';

const Summary = () => {
  console.log('summary was hit');
  return (
    <div>
      {/* "Route to" act like html links */}
      {/* "Route path" acts like a server listening not on a port but on a broweser route */}
      <Route to="/oauth" component={OauthForm} />
      <Route to="/settings" component={SettingsTemp} />
    </div>
  );
};

export default Summary;
