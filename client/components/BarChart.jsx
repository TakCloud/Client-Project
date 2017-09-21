import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

const data = [{
  total: 1000,
  delivered: 500,
  opened: 200,
  clicked: 100,
  responded: 50,
  soft: 25,
  hard: 125,
}];

// const data = [{ name: 1, sent: 200 }, { name: 2, sent: 300 }, { name: 3, sent: 500 }];

export default function BarChart() {
  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis tickValues={[]} tickFormat={[]} label="Total E-mails" />
      <VictoryAxis dependentAxis tickFormat={x => (`${x}`)} />
      <VictoryStack>
        <VictoryBar data={data} x="total" y="delivered" />
        <VictoryBar data={data} x="total" y="opened" />
        <VictoryBar data={data} x="total" y="clicked" />
        <VictoryBar data={data} x="total" y="responded" />
        <VictoryBar data={data} x="total" y="soft" />
        <VictoryBar data={data} x="total" y="hard" />
      </VictoryStack>
    </VictoryChart>
  );
}
