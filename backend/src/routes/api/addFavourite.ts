import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { Favourites } from '../../database/models/favourites';

const router = express.Router();

router.put(
  '/api/addFavourite',
  [
    body('book')
      .notEmpty()
      .isObject()
      .withMessage('You must provide a valid favourite list')
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Find user favourites in database
      2 - Update / create database entry
      3 - Send response
    */

    // 1
    const storedFavourites = await Favourites.findOne({
      userId: req.currentUser!.id
    });

    // 2
    if (!storedFavourites) {
      const favourites = Favourites.build({
        userId: req.currentUser!.id,
        books: [req.body.book]
      });
      await favourites.save();

      // 3
      res.send([req.body.book]);
      return;
    } else {
      const { books } = storedFavourites;

      if (!books.find((book) => book.key === req.body.book.key)) {
        books.push(req.body.book);

        storedFavourites.set({
          books
        });
        await storedFavourites.save();
      }

      // 3
      res.send(books);
      return;
    }
  }
);

export { router as addFavouritesRoute };
