import axios from 'axios'
import Cookie from "cookie-cutter";
import {config} from '../constants';

const api = {
  instances: {},
  init: (instanceName) => {
    if (!api.instances[instanceName]) {
      api.instances[instanceName] = axios.create({
        baseURL: config.endpoint,
        timeout: 1000,
      });
      api.instances[instanceName].interceptors.request.use(
        function (config) {
          const token = Cookie.get("accessToken");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      api.instances[instanceName].interceptors.response.use(
        (response) => {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        (error) => {
          // if (error.response?.status === 401) {
          //   Cookie.set("accessToken", "", {
          //     path: "/",
          //     expires: new Date(0),
          //   });
          //   Router.reload();
          // }
          return Promise.reject(error);
        }
      );
    }
    return api.instances[instanceName];
  },
};

export default api;