import axios from 'axios';

export const POST_NEWCAMPAIGN = 'POST_NEWCAMPAIGN';

export function postNewCampaign(newCampaign, callback) {
  return (dispatch) => {
    axios.post('/createcampaign', newCampaign)
      .then(response => dispatch({
        type: POST_NEWCAMPAIGN,
        payload: response,
      }))
      .then(() => callback());
  };
}
