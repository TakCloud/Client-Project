import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';


const NewCampaignFormSummaryPageTwo = () => {
  return (
    <div className="newcampaign-container">
      <AppBar
        title="Campaign Summary"
        className="first-page-header"
        showMenuIconButton={false}
        style={{ height: '100px', backgroundColor: '#2196F3' }}
      />
      <div className="steps-container">
        <h3 className="first-page-title">Campaign Name: First Leads</h3>
        <h3 className="first-page-title">Recipient Group: First Freight</h3>
        <Toolbar className="campaign-summary-toolbar">
          <ToolbarGroup>
            <ToolbarTitle text="Step 1 - Welcome to First Freight" />
            <ToolbarSeparator />
            <EditorModeEdit />
            <ActionDelete />
          </ToolbarGroup>
        </Toolbar>
        <Toolbar className="campaign-summary-toolbar">
          <ToolbarGroup>
            <ToolbarTitle text="Step 2 - Thank you for time" />
            <ToolbarSeparator />
            <ToolbarGroup>
              <EditorModeEdit />
              <ActionDelete />
            </ToolbarGroup>
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
      />
    </div>
  );
};


export default NewCampaignFormSummaryPageTwo;
