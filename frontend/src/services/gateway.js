import qs from 'qs';
import axios from 'axios';

const gateway = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
  paramsSerializer: params => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' }),
});

gateway.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

gateway.interceptors.request.use(
  (config) => {
  },
  error => Promise.reject(error),
);

export default gateway