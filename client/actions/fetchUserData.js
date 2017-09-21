import axios from 'axios';

export const FETCH_USERDATA = 'FETCH_USERDATA';

export function fetchUserData(user) {
  const userDataRequest = axios.get('/login', user);
  // Make request to server to verify username/password.
  // Once verified, will return data as a promise
  // Middleware will resolve promise first before sending to reducer_user

  return {
    type: FETCH_USERDATA,
    payload: userDataRequest,
  };
}
