import axios from 'axios';
import setAuthHeader from '../../services/setAuthHeader';
import backend from '../backend';
import {
  getRefreshToken,
  setAccessToken
} from '../../services/localStorageService';

export const authMiddlewareSuccess = (response) => response;

export const authMiddlewareFailure = async (error) => {
  const originalRequest = error.config;

  if (
    error.response.status === 403 &&
    error.response.data.errors[0].message === 'jwt expired' &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    let res;

    try {
      res = await backend.post('/auth/token', {
        token: getRefreshToken()
      });

      setAccessToken(res.data.accessToken);

      setAuthHeader(res.data.accessToken);

      originalRequest.headers['Authorization'] = res.data.accessToken;
      return axios(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
};
