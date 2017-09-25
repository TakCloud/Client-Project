import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './reducer_user';
import fakeUserReducer from './fakereducer_user';


const rootReducer = combineReducers({
  data: fakeUserReducer,
  userdata: userReducer,
  form: formReducer,
});

export default rootReducer;
