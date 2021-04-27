import store from '../redux/store/store';
import { AUTH } from '../redux/actions/actionTypes';
import { getAccessToken } from '../services/localStorageService';
import setAuthHeader from '../services/setAuthHeader';

const isAuthenticated = () => {
  if (!getAccessToken()) {
    store.dispatch({
      type: AUTH,
      payload: false
    });

    return false;
  } else {
    setAuthHeader(getAccessToken());
    store.dispatch({
      type: AUTH,
      payload: true
    });

    return true;
  }
};

export default isAuthenticated;
