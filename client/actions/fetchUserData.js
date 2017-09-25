import axios from 'axios';

export const FETCH_USERDATA = 'FETCH_USERDATA';

export function fetchUserData(user) {
  const userDataRequest = axios.post('/login', JSON.stringify(user))
    .then(() => console.log('PLEASE'));

  return {
    type: FETCH_USERDATA,
    payload: userDataRequest,
  };
}
