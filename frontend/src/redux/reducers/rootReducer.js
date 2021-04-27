import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import favouritesReducer from './favouritesReducer';
import authReducer from './authReducer';

export default combineReducers({
  search: searchReducer,
  favourites: favouritesReducer,
  auth: authReducer
});
