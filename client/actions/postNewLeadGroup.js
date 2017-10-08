import axios from 'axios';

export function postNewLeadGroup(leads) {
  return (dispatch) => {
    console.log(leads);
    axios.post('/createleadgroup', leads);
  };
}

export default {
  postNewLeadGroup,
};
