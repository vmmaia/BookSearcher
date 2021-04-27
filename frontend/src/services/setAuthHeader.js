import backend from '../apis/backend';

const setAuthHeader = (accessToken) => {
  backend.defaults.headers.common['Authorization'] = accessToken;
};

export default setAuthHeader;
