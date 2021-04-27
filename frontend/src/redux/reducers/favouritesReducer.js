import {
  FAVOURITES_OPEN,
  FAVOURITES_CLOSE,
  FAVOURITES_GET,
  FAVOURITES_SET
} from '../actions/actionTypes';

const initialState = {
  open: false,
  loading: false,
  books: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITES_OPEN:
      return { ...state, open: true };

    case FAVOURITES_CLOSE:
      return { ...state, open: false };

    case FAVOURITES_GET:
      return { ...state, ...action.payload };

    case FAVOURITES_SET:
      return { ...state, books: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
