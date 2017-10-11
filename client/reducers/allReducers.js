import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userProfile, userCampaigns, userTemplates, userTotalMetrics } from './reducer_user';
import fakeUserReducer from './fakereducer_user';
import fakeLeadGroupReducer from './fakereducer_leadgroups';
import fakeUserTemplates from './fakereducer_userTemplates';


const rootReducer = combineReducers({
  data: fakeUserReducer,
  form: formReducer,
  userProfile,
  userCampaigns,
  userTemplates,
  userTotalMetrics,
  leadGroups: fakeLeadGroupReducer,
  userFakeTemplates: fakeUserTemplates,
});

export default rootReducer;
