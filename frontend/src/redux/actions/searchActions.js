import { SEARCH, SEARCH_BOOK, SEARCH_RESET } from './actionTypes';
import backend from '../../apis/backend';
import notification from '../../components/notification/notification';

export const search = (query) => async (dispatch) => {
  dispatch({
    type: SEARCH,
    payload: {
      query,
      searching: true,
      searchResultsHidden: false,
      results: []
    }
  });

  try {
    const response = await backend.post('/search', {
      query
    });

    dispatch({
      type: SEARCH,
      payload: {
        query,
        searching: false,
        searchResultsHidden: false,
        results: response.data
      }
    });
  } catch (error) {
    dispatch({
      type: SEARCH,
      payload: {
        query,
        searching: false,
        searchResultsHidden: false,
        results: []
      }
    });

    notification(error.response.data.errors);
  }
};

export const resetSearch = () => (dispatch) => {
  dispatch({
    type: SEARCH_RESET,
    payload: {}
  });
};

export const searchBook = (workId) => async (dispatch) => {
  try {
    const response = await backend.post('/book', {
      workId
    });

    dispatch({
      type: SEARCH_BOOK,
      payload: {
        loadingBookPage: false,
        book: response.data
      }
    });
  } catch (error) {
    dispatch({
      type: SEARCH_BOOK,
      payload: {
        loadingBookPage: false,
        book: undefined
      }
    });

    notification(error.response.data.errors);
  }
};
