import history from '../../history';
import {
  setRefreshToken,
  setAccessToken,
  clearTokens,
  getRefreshToken,
  getAccessToken
} from '../../services/localStorageService';
import setAuthHeader from '../../services/setAuthHeader';

import backend from '../../apis/backend';

import notification from '../../components/notification/notification';

export const signup = (form) => async (dispatch) => {
  try {
    const { email, password } = form;
    const response = await backend.post('/auth/signup', { email, password });

    setRefreshToken(response.data.user.refreshToken);
    setAccessToken(response.data.accessToken);

    setAuthHeader(response.data.accessToken);

    history.push('/');
  } catch (error) {
    notification(error.response.data.errors);
  }
};

export const signin = (form) => async (dispatch) => {
  try {
    const { email, password } = form;
    const response = await backend.post('/auth/signin', { email, password });

    setRefreshToken(response.data.user.refreshToken);
    setAccessToken(response.data.accessToken);

    setAuthHeader(response.data.accessToken);

    history.push('/');
  } catch (error) {
    notification(error.response.data.errors);
  }
};

export const signout = () => {
  return async (dispatch) => {
    try {
      await backend.post('/auth/signout');

      clearTokens();

      history.push('/login');
    } catch (error) {
      notification(error.response.data.errors);
    }
  };
};

export const renewAccessToken = () => async (dispatch) => {
  try {
    if (getAccessToken()) {
      setAuthHeader(getAccessToken());
    }

    const response = await backend.post('/auth/token', {
      token: getRefreshToken()
    });

    setAccessToken(response.data.accessToken);
    setAuthHeader(response.data.accessToken);
  } catch (error) {
    notification(error.response.data.errors);
  }
};
