import axios from 'axios';

export const POST_ORGANIZATIONDATA = 'POST_ORGANIZATIONDATA';

export function postOrganizationData(newOrg) {
  const postOrgData = axios.post('/createorg', newOrg);

  return {
    type: POST_ORGANIZATIONDATA,
    payload: postOrgData,
  };
}
