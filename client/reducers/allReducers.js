import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './reducer_user';
import organizationReducer from './reducer_organization';
import fakeUserReducer from './fakereducer_user';


const rootReducer = combineReducers({
  data: fakeUserReducer,
  form: formReducer,
});

export default rootReducer;
