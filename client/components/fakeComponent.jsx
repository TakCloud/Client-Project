import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class fakeComponent extends Component {
  renderList() {
    return this.props.campaigndata.map(campaign => <li>{campaign.name}</li>);
  }

  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}
fakeComponent.propTypes = {
  campaigndata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    campaigndata: state.data,
  };
}

export default connect(mapStateToProps)(fakeComponent);
