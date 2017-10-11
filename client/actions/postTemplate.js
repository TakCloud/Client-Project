import axios from 'axios';

export const POST_TEMPLATE = 'POST_TEMPLATE';

export function postTemplate(values) {
  return (dispatch) => {
    axios.post('/createtemplate', values)
      .then(response => dispatch({
        type: POST_TEMPLATE,
        payload: response,
      }));
  };
}

export default {
  postTemplate,
};
