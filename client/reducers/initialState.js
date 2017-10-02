const initialState = {
  userProfile: {
    userDetails: {},
    organizationDetails: {},
  },
  userCampaigns: {
    campaigns: {},
  },
  userTemplates: {
    templates: [{ template_id: 34534, template_name: 'Best Template', subject: 'HELLO', body: 'Welcome' },
      { template_id: 24534, template_name: 'Worst Template', subject: 'GOODBYE', body: 'NO WAY' }],
  },
  userTotalMetrics: {
    totalMetrics: {},
  },
  leadgroups: [],
};

export default initialState;
