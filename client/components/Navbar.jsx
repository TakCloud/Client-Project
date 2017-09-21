import React from 'react';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

export default function Navbar() {
  return (
    <BottomNavigation value={0} showLabels>
      <BottomNavigationButton label="Create New" />
      <BottomNavigationButton label="Campaign History" />
    </BottomNavigation>
  );
}
