import React from 'react';
import { VictoryPie } from 'victory';

const data = [{
  name: 'Campaign #1',
  total: 1000,
  delivered: 600,
  opened: 100,
  clicked: 100,
  responded: 50,
  soft: 25,
  hard: 125,
}, {
  name: 'Campaign #2',
  total: 1000,
  delivered: 200,
  opened: 100,
  clicked: 150,
  responded: 50,
  soft: 50,
  hard: 450,
}, {
  name: 'Campaign #3',
  total: 1000,
  delivered: 200,
  opened: 100,
  clicked: 150,
  responded: 50,
  soft: 50,
  hard: 450,
}];

const PieCharts = () => (
  <div>
    {data.map(campaignData => (
      <VictoryPie
        data={[
          { x: 'Delivered', y: campaignData.delivered },
          { x: 'Opened', y: campaignData.opened },
          { x: 'Clicked', y: campaignData.clicked },
          { x: 'Responded', y: campaignData.responded },
          { x: 'Soft', y: campaignData.soft },
          { x: 'Hard', y: campaignData.hard },
        ]}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'green']}
      />
    ))}
  </div>
);

export default PieCharts;
