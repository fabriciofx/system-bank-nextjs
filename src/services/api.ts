import axios, { type AxiosRequestConfig } from 'axios';
import { setAuthTokens } from '../actions/authAction';
import { getAuthTokens } from '../session/session';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const tokens = await getAuthTokens();
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const tokens = await getAuthTokens();
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshResponse = await api.post('/token/refresh/', {
          refresh: tokens.refresh
        });
        setAuthTokens({
          access: refreshResponse.data.access,
          refresh: tokens.refresh
        });
        if (config.headers) {
          config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        }
        return api(config);
      } catch (refreshError) {
        console.error('Error to refresh access token: ', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
