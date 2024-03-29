import axios from 'axios';
import { store } from '../redux/store';
import envConfig from '../config/env';

const axiosClient = axios.create({
  baseURL: envConfig().apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true
});

axiosClient.interceptors.request.use(async (config) => {
  const { user } = store.getState().user;
  if (user.token !== null) {
    config.headers.Authorization = 'Bearer ' + user.token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {

    return Promise.reject(err);
  }
);



export function fetcher(url) {
  return axiosClient.get(url).then((res) => res.data);
}

export default axiosClient;

