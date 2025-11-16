'use client';

import axios, { type AxiosRequestConfig } from 'axios';
import { STORAGE } from './AuthService';

const api = axios.create({
  baseURL: 'https://aula-angular.bcorp.tec.br/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const access = STORAGE.value('access_token')[0] ?? '';
  console.log('request access: ', access);
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh = STORAGE.value('refresh_token')[0] ?? '';
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshResponse = await api.post('/token/refresh/', {
          refresh: refresh
        });
        STORAGE.store('access_token', refreshResponse.data.access);
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
