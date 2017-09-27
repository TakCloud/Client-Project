import axios from 'axios';

export const FETCH_USERCAMPAIGNS = 'FETCH_USERCAMPAIGNS';
export const FETCH_USERDETAILS = 'FETCH_USERDETAILS';

export function fetchUserData(user, callback) {
  return (dispatch) => {
    axios.post('/login', user)
      .then((response) => {
        const userDetails = {};
        userDetails.user_id = response.data[0].user_id;
        userDetails.user_email = response.data[0].user_email;
        dispatch({ type: FETCH_USERCAMPAIGNS, campaigns: response.data[0].campaigns });
        dispatch({ type: FETCH_USERDETAILS, userDetails });
      })
      .then(() => callback());
  };
}

export default {
  fetchUserData,
};

// .then(response => dispatch({
//   type: FETCH_USERDATA,
//   payload: response,
// }))
