import axios from 'axios';

export const FETCH_USERDETAILS = 'FETCH_USERDETAILS';
export const FETCH_USERCAMPAIGNS = 'FETCH_USERCAMPAIGNS';

export function postNewOrg(values, callback) {
  return (dispatch) => {
    axios.post('/createorg', values)
      .then((response) => {
        const userDetails = Object.assign({}, {
          user_id: response.data[0].user_id,
          user_email: response.data[0].user_email,
        });
        dispatch({ type: FETCH_USERCAMPAIGNS, campaigns: response.data[0].campaigns });
        dispatch({ type: FETCH_USERDETAILS, userDetails });
      })
      .then(() => callback());
  };
}

export default {
  postNewOrg,
};
