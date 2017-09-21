import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import { Link } from 'react-router-dom';

class RealPieCharts extends Component {
  render() {
    const { campaignData } = this.props;
    return (
      <div>
        <div>
        Name: { campaignData.name }
        </div>
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
        />
        <Link to="/dashboard">Back to Index</Link>
      </div>
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
