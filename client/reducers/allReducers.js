import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userProfile, userCampaigns } from './reducer_user';
import fakeUserReducer from './fakereducer_user';


const rootReducer = combineReducers({
  data: fakeUserReducer,
  form: formReducer,
  userProfile,
  userCampaigns,
  // userTemplates,
  // userTotalMetrics,
});

export default rootReducer;
