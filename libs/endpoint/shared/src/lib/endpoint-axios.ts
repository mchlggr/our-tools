/*
The default client for endpoints
*/

// ---

// Dependencies
import axios from 'axios';
import qs from 'qs';

// Types
import { AxiosInstance } from 'axios';
import { Client, HTTP_METHOD } from './endpointTypes';
import * as process from 'node:process';

//---

const objectToQuerystring = (params) =>
  qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

const createAxiosClient = (baseURL= ""): Client => {
  const client: AxiosInstance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    paramsSerializer: { serialize: objectToQuerystring },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO: move this logic to Http class
      // if(error.response.status == 401) {
      //     window.location.href = '/login'
      // }
      return Promise.reject(error);
    }
  );

  client.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  // @ts-ignore
  return {
    fetch: async (options) => {
            // debugger;
      const { url, params, method, headers } = options;
      let payload;
      switch (method) {
        case HTTP_METHOD.put:
        case HTTP_METHOD.post:
        case HTTP_METHOD.delete:
        case HTTP_METHOD.patch:
          payload = { data: params };
          break;
        default:
          payload = { params };
      }

      const config = { url, method, headers, ...payload };
      const response = await client(config);
      return response;
    },
  };
};

const client = createAxiosClient();

// ---

if(process.env.NODE_ENV !== "production") {
  window.__axios__ = axios;
  window.__client__ = client;
}

// ---

export { createAxiosClient, client };
