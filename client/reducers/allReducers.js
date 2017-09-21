import { combineReducers } from 'redux';
import userReducer from './reducer_user';
import organizationReducer from './reducer_organization';
import fakeUserReducer from './fakereducer_user';

const rootReducer = combineReducers({
  data: fakeUserReducer,
});

export default rootReducer;
