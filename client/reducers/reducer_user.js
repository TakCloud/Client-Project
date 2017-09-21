import { FETCH_USERDATA } from '../actions/fetchUserData';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USERDATA:
      return action.payload.data;
    default:
      return state;
  }
}
