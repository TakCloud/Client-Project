import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const toolbarStyle = {
  backgroundColor: 'white',
};

class CampaignButtons extends Component {
  renderList() {
    return this.props.campaignData.map(campaign => (
      <Toolbar style={toolbarStyle} key={campaign.id}>
        <ToolbarGroup className="campaignButtonsContainer">
          <RaisedButton
            className="campaignButtons"
            label={campaign.name}
            containerElement={<Link to={`/summary/${campaign.id}`} key={campaign.id} />}
            primary
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <FlatButton label="Edit" primary />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <FlatButton label="Delete" secondary />
        </ToolbarGroup>
      </Toolbar>
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

CampaignButtons.propTypes = {
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

export default connect(mapStateToProps)(CampaignButtons);
