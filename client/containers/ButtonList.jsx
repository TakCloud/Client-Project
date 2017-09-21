import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import PieChart from './PieChart';

class ButtonList extends Component {
  renderList() {
    return this.props.campaignData.map(campaign => (
      <div>
        <RaisedButton className="campaignButtons" primary label={campaign.name} containerElement={<Link to={`/dashboard/${campaign.id}`} key={campaign.id} />} />
      </div>
    ));
  }
  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campaignData: state.data.campaign };
}

ButtonList.propTypes = {
  campaignData: PropTypes.arrayOf(
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

export default connect(mapStateToProps)(ButtonList);
