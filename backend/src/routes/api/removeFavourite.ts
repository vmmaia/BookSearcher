import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { Favourites } from '../../database/models/favourites';

const router = express.Router();

router.put(
  '/api/removeFavourite',
  [
    body('book')
      .notEmpty()
      .isString()
      .withMessage('You must provide a valid favourite list')
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Find user favourites in database
      2 - Update database entry
      3 - Send response
    */

    // 1
    const storedFavourites = await Favourites.findOne({
      userId: req.currentUser!.id
    });

    // 2
    if (storedFavourites) {
      let { books } = storedFavourites;

      books = books.filter((book) => book.key !== req.body.book);

      storedFavourites.set({
        books
      });

      await storedFavourites.save();

      // 3
      res.send(books);
      return;
    }

    // 3
    res.send([]);
  }
);

export { router as removeFavouritesRoute };
