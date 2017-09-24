import axios from 'axios';

export const POST_NEWCAMPAIGN = 'POST_NEWCAMPAIGN';

export function postNewCampaign(newCampaign) {
  const request = axios.post('/createcampaign', newCampaign);

  return {
    type: POST_NEWCAMPAIGN,
    payload: request,
  };
}
