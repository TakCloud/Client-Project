import axios from 'axios';

export const FETCH_USERDATA = 'FETCH_USERDATA';

export function fetchUserData(user, callback) {
  return (dispatch) => {
    axios.post('/login', user)
      .then(response => dispatch({
        type: FETCH_USERDATA,
        payload: response,
      }))
      .then(() => callback());
  };
}

//   const userDataRequest = axios.post('/login', user)
//     .then(() => callback());
//
//   return {
//     type: FETCH_USERDATA,
//     payload: userDataRequest,
//   };
// }
