import { AUTH } from '../actions/actionTypes';

const initialState = {
  authenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, authenticated: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
