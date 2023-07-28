const axios = require('axios');
module.exports = { send: (selectionText) => {
  return axios({
    method: 'POST',
    url: 'https://nota.lol/api/endpoint',
    data: selectionText,
  });
} };