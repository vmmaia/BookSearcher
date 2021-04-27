import mongoose from 'mongoose';
import BookAttrs from './BookAttrs';

interface FavouriteDoc extends mongoose.Document {
  userId: string;
  books: Array<BookAttrs>;
}

export default FavouriteDoc;
