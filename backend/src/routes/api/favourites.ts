import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { Favourites } from '../../database/models/favourites';

const router = express.Router();

router.post(
  '/api/favourites',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Find user favourites in database
      2 - Return favourites
    */

    // 1
    const favourites = await Favourites.findOne({
      userId: req.currentUser!.id
    });

    // 2
    if (!favourites) {
      res.send([]);
    } else {
      res.send(favourites.books);
    }
  }
);

export { router as getFavouritesRoute };
