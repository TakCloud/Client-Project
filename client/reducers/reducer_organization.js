import { POST_ORGANIZATIONDATA } from '../actions/fetchUserData';

export default function (state = [], action) {
  // Reducer will take action type and populate redux state
  switch (action.type) {
    case POST_ORGANIZATIONDATA:
      return [action.payload.data.organizationInfo];

    default:
  }
  return state;
}
