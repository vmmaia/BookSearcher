import {
  FAVOURITES_OPEN,
  FAVOURITES_CLOSE,
  FAVOURITES_GET,
  FAVOURITES_SET
} from './actionTypes';
import backend from '../../apis/backend';

import notification from '../../components/notification/notification';

export const openFavourites = () => (dispatch) => {
  dispatch({
    type: FAVOURITES_OPEN,
    payload: {}
  });
};

export const closeFavourites = () => (dispatch) => {
  dispatch({
    type: FAVOURITES_CLOSE,
    payload: {}
  });
};

export const getFavourites = () => async (dispatch) => {
  dispatch({
    type: FAVOURITES_GET,
    payload: { loading: true }
  });

  try {
    const response = await backend.post('/favourites');

    dispatch({
      type: FAVOURITES_GET,
      payload: { loading: false, books: response.data }
    });
  } catch (error) {
    dispatch({
      type: FAVOURITES_GET,
      payload: { loading: false, books: [] }
    });

    notification(error.response.data.errors);
  }
};

export const addToFavourites = (book) => async (dispatch) => {
  const favouriteBook = {
    key: book.key,
    title: book.title || 'No Title',
    author_name: book.author_name || [],
    cover_i:
      book.covers[0] ||
      'https://openlibrary.org/static/images/icons/avatar_book-lg.png'
  };

  try {
    const response = await backend.put('/addFavourite', {
      book: favouriteBook
    });

    dispatch({
      type: FAVOURITES_SET,
      payload: response.data
    });
  } catch (error) {
    notification(error.response.data.errors);
  }
};

export const removeFromFavourites = (book) => async (dispatch) => {
  try {
    const response = await backend.put('/removeFavourite', {
      book
    });

    dispatch({
      type: FAVOURITES_SET,
      payload: response.data
    });
  } catch (error) {
    notification(error.response.data.errors);
  }
};
