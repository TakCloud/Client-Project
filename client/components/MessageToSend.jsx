import React from 'react';

export default function MessageToSend(endUser) {
  return (
    <div>
      <b><img src={`https://cheatcodes5.herokuapp.com/summary/imageTracker?alexiskooooooool=${endUser}`} alt="" /></b>
    </div>
  );
}
