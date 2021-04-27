import mongoose from 'mongoose';
import FavouriteAttrs from './FavouriteAttrs';
import FavouriteDoc from './FavouriteDoc';

interface FavouriteModel extends mongoose.Model<FavouriteDoc> {
  build(attrs: FavouriteAttrs): FavouriteDoc;
}

export default FavouriteModel;
