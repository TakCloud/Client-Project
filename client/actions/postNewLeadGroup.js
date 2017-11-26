import axios from 'axios';

export function postNewLeadGroup(leads) {
  return (dispatch) => {
    // console.log(leads);
    axios.post('/createleadgroup', leads)
      .then(() => console.log('hi'));
  };
}

export default {
  postNewLeadGroup,
};
