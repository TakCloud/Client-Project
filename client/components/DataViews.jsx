import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

export default function DataViews() {
  return (
    <SwipeableViews enableMouseEvents="true">
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
        Data #1
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}>
        Data #2
      </div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}>
        Data #3
      </div>
    </SwipeableViews>
  );
}
