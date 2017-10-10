import axios from 'axios';

export const POST_TEMPLATE = 'POST_TEMPLATE';

export function postTemplate(newTemplate) {
  return (dispatch) => {
    axios.post('/createtemplate', newTemplate);
  };
}
