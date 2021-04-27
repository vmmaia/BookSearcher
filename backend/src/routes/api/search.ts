import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import axios from 'axios';
import { BadSearchError } from '../../errors/bad-search-error';

const router = express.Router();

interface bookInterface {
  key: string;
  title: string;
  cover_i: string;
  author_name: [string];
}

router.post(
  '/api/search',
  [
    body('query')
      .notEmpty()
      .isString()
      .withMessage('Search term must be a non-empty string.')
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Search archive.org api
      2 - Filter extrenuos information and format data
      3 - Return results
    */

    // 1
    const query: string = req.body.query;

    const url = `http://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=10&fields=key,cover_i,title,author_name,name`;

    try {
      const response = await axios.get(url);

      // 2
      const formatedResponse = new Array<bookInterface>();

      response.data.docs.forEach((book: any) => {
        const b: bookInterface = {
          key: book.key.replace('/works/', '') || 'undefined',
          title: book.title || 'No Title',
          cover_i: `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=https://openlibrary.org/static/images/icons/avatar_book-lg.png`,
          author_name: book.author_name || []
        };

        formatedResponse.push(b);
      });

      // 3
      res.send(formatedResponse);
    } catch (error) {
      throw new BadSearchError();
    }
  }
);

export { router as searchRoute };
