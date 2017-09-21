import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { VictoryPie } from 'victory';


const DropDown = () => (
  <div>
    <DropDownMenu>
      <VictoryPie
        data={[
          { x: 'Delivered', y: 200 },
          { x: 'Opened', y: 100 },
          { x: 'Clicked', y: 150 },
          { x: 'Responded', y: 50 },
          { x: 'Soft', y: 50 },
          { x: 'Hard', y: 450 },
        ]}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'green']}
      />
    </DropDownMenu>
  </div>
);

export default DropDown;

// {/* <VictoryPie
//   data={[
//     { x: 'Delivered', y: 200 },
//     { x: 'Opened', y: 100 },
//     { x: 'Clicked', y: 150 },
//     { x: 'Responded', y: 50 },
//     { x: 'Soft', y: 50 },
//     { x: 'Hard', y: 450 },
//   ]}
//   colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'green']}
// /> */}
