import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';


const NewCampaignFormSummaryPage = () => {
  return (
<<<<<<< HEAD
    <div className="newcampaign-last-page-container">
=======
    <div className="newcampaign-container">
>>>>>>> 4e95e85c0936e61d08072cbe1aea77cb0d79b2e4
      <AppBar
        title="Campaign Summary"
        className="first-page-header"
        showMenuIconButton={false}
        style={{ height: '100px', backgroundColor: '#2196F3' }}
      />
      <div className="steps-container">
<<<<<<< HEAD
        <h3 className="first-page-title">Campaign Name: New Asia Route (10/25)</h3>
        <h3 className="first-page-title">Recipient Group: Asia Leads</h3>
        <Toolbar className="campaign-summary-toolbar">
          <ToolbarGroup>
            <ToolbarTitle className="campaign-summary-toolbar-title" text="Step 1 - New Asia Opportunity" />
            <ToolbarSeparator />
            <div className="campaign-summary-step-buttons">
              <EditorModeEdit />
              <ActionDelete />
            </div>
          </ToolbarGroup>
        </Toolbar>
      </div>
      <div className="campaign-summary-buttons-container">
        <RaisedButton
          label="Add Step"
          className="add-new-email"
          primary
        />
        <RaisedButton
          label="Confirm"
          className="campaign-form-next-buttons"
          secondary
          containerElement={<Link to={'/summary'} />}
        />
      </div>
=======
        <h3 className="first-page-title">Campaign Name: New Leads</h3>
        <h3 className="first-page-title">Recipient Group: USA Freight</h3>
        <Toolbar className="campaign-summary-toolbar">
          <ToolbarGroup>
            <ToolbarTitle className="campaign-summary-toolbar-title" text="Step 1 - We have a deal for you!" />
            <ToolbarSeparator />
            <EditorModeEdit />
            <ActionDelete />
          </ToolbarGroup>
        </Toolbar>
      </div>
      <RaisedButton
        label="Add Step"
        className="add-new-email"
        primary
      />
      <RaisedButton
        label="Confirm Campaign"
        className="campaign-form-next-buttons"
        secondary
        containerElement={<Link to={'/summary'} />}
      />
>>>>>>> 4e95e85c0936e61d08072cbe1aea77cb0d79b2e4
    </div>
  );
};


export default NewCampaignFormSummaryPage;
