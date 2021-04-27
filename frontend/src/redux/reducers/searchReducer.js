import { SEARCH, SEARCH_BOOK, SEARCH_RESET } from '../actions/actionTypes';

const initialState = {
  query: '',
  searching: false,
  searchResultsHidden: true,
  loadingBookPage: true,
  currentBook: undefined,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      const newState = { ...state };
      newState.results = action.payload.results;

      return {
        ...newState,
        query: action.payload.query,
        searching: action.payload.searching,
        searchResultsHidden: action.payload.searchResultsHidden
      };

    case SEARCH_BOOK:
      return {
        ...state,
        loadingBookPage: action.payload.loadingBookPage,
        currentBook: action.payload.book
      };

    case SEARCH_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
