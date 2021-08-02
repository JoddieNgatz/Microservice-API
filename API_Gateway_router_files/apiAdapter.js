const axios = require('axios');

//const request = require('request');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });

}