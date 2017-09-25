import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class RealPieCharts extends Component {
  render() {
    const { campaignData } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={campaignData.name}
            iconElementLeft={<IconButton containerElement={<Link to="/summary" />}><NavigationClose /></IconButton>}
          />
          <div className="campaignDataContainer">
            Total E-mails: { campaignData.total }
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
              style={{ labels: { fontSize: 8 } }}
              padding={{ top: 10, left: 30, right: 50 }}
              height={200}
            />
          </div>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Delivered: {campaignData.delivered}</TableRowColumn>
                <TableRowColumn>Opened: {campaignData.opened}</TableRowColumn>
                <TableRowColumn>Clicked: {campaignData.clicked}</TableRowColumn>
                <TableRowColumn>Responded: {campaignData.responded}</TableRowColumn>
                <TableRowColumn>Soft: {campaignData.soft}</TableRowColumn>
                <TableRowColumn>Hard: {campaignData.hard}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const changedState = _.mapKeys(state.data.campaign, 'id');
  return { campaignData: changedState[ownProps.match.params.id] };
}

RealPieCharts.propTypes = {
  campaignData: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      delivered: PropTypes.number.isRequired,
      opened: PropTypes.number.isRequired,
      clicked: PropTypes.number.isRequired,
      responded: PropTypes.number.isRequired,
      soft: PropTypes.number.isRequired,
      hard: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(RealPieCharts);
