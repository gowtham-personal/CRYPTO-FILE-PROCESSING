let axios = require("axios");
let CONFIG_CONSTANTS = require("./configConstants");
let defaultHeader = {
  "Content-Type": "application/json",
};

axios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});

axios.interceptors.response.use((res) => {
  // Important: response interceptors **must** return the response.
  return res;
});

/**
 * Api wrapper Service for all Method
 * @param {string} url
 * @param {object} header
 * @param {object} params
 */
const makeApiCall = async (parameter) => {
  try {
    const response = await axios({
      method: parameter.method,
      url: parameter.host
        ? `${parameter.host}${parameter.url}`
        : `${CONFIG_CONSTANTS.HOST}${parameter.url}`,
      params: parameter.params,
      data: parameter.request,
      headers: parameter.header ? parameter.header : defaultHeader,
    });
    return response;
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      console.log("error api 401", error);
    }
    if (error && error.response) {
      return error.response;
    }
    return error;
  }
};

module.exports = makeApiCall;
