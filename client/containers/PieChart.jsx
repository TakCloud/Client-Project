import React from 'react';
import { VictoryPie } from 'victory';

const PieChart = () => (
  <div>
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
  </div>
);

export default PieChart;
