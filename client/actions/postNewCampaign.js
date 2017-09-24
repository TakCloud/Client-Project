// import axios from 'axios';
const xhr = new XMLHttpRequest();


export const POST_NEWCAMPAIGN = 'POST_NEWCAMPAIGN';

export function postNewCampaign(newCampaign) {
  console.log('FUCKKK');
  const params = newCampaign;
  xhr.open('POST', '/createcampaign', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      return {
        type: POST_NEWCAMPAIGN,
        payload: xhr.responseText,
      };
    }
    return true;
  };
  xhr.send(JSON.stringify(params));
  // const request = axios.post('/createcampaign', newCampaign);
}
