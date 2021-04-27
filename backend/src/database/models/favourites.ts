import mongoose from 'mongoose';

import FavouriteAttrs from '../interfaces/FavouriteAttrs';
import FavouriteDoc from '../interfaces/FavouriteDoc';
import FavouriteModel from '../interfaces/FavouriteModel';

const favouritesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    books: {
      type: [Object],
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

favouritesSchema.statics.build = (attrs: FavouriteAttrs) => {
  return new Favourites(attrs);
};

const Favourites = mongoose.model<FavouriteDoc, FavouriteModel>(
  'Favourites',
  favouritesSchema
);

export { Favourites };
