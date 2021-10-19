import Axios from 'axios';

const URL_BASE = 'http://localhost:3000';

Axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export function apiGet(endpoint, data, dataResp) {
  return apiCall('get', endpoint, data, dataResp);
}

export function apiPost(endpoint, data, dataResp) {
  return apiCall('post', endpoint, data, dataResp);
}

export async function apiCall(method, endpoint, data, dataResp) {
  const axiosResp = await Axios({
    method,
    url: `${URL_BASE}${endpoint}`,
    data,
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  // console.log('apiCall', axiosResp);
  if (dataResp && dataResp.onResponse && axiosResp.statusText === 'OK') {
    // console.log('apiCall onResponse', axiosResp);
    dataResp.onResponse(axiosResp.data);
  } else if (dataResp && dataResp.onError) {
    dataResp.onError(axiosResp);
  }

  return axiosResp;
}
