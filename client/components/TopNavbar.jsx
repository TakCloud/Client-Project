import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default function TopNavbar() {
  return (
    <AppBar
      title={<span>First Freight</span>}
      iconElementRight={<FlatButton label="User Settings" />}
      showMenuIconButton={false}
    />
  );
}
