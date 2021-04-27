import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import axios from 'axios';
import { BookNotFoundError } from '../../errors/book-not-found-error';

const router = express.Router();

interface bookInterface {
  key: string;
  title: string;
  subtitle?: string;
  description: string;
  covers: string[];
  author_name: string[];
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
}

const getAuthorsNames = async (authorsRaw: [any] | []) => {
  const res: string[] = [];

  for (let i = 0; i < authorsRaw.length; i++) {
    try {
      const { key } = authorsRaw[i].author;

      const response = await axios.get(`http://openlibrary.org${key}.json`);

      res.push(response.data.name || 'Unknown author');
    } catch (error) {
      res.push('Unknown author');
    }
  }

  return res;
};

router.post(
  '/api/book',
  [
    body('workId')
      .notEmpty()
      .isString()
      .withMessage('You must provide a valid work id')
  ],
  validateRequest,
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Call archive.org api
      2 - Filter extrenuos information and format data
      3 - Return results
    */

    // 1
    const workId: string = req.body.workId;

    const url = `http://openlibrary.org/works/${workId}.json`;

    try {
      const response = await axios.get(url);

      // 2
      const data = response.data;

      const formatedResponse: bookInterface = {
        key: workId,
        title: data.title || 'Unknown title',
        subtitle: data.subtitle || undefined,
        description: data.description
          ? data.description.value
          : 'No description',
        covers: data.covers
          ? data.covers.map((c: any) => {
              return `http://covers.openlibrary.org/b/id/${c}-L.jpg?default=https://openlibrary.org/static/images/icons/avatar_book-lg.png`;
            })
          : ['https://openlibrary.org/static/images/icons/avatar_book-lg.png'],
        author_name: data.authors
          ? await getAuthorsNames(data.authors)
          : ['Unknown author'],
        subjects: data.subjects || undefined,
        subject_places: data.subject_places || undefined,
        subject_people: data.subject_people || undefined
      };

      // 3
      res.send(formatedResponse);
    } catch (error) {
      if (
        error.response.status === 404 &&
        error.response.data.error !== undefined
      ) {
        throw new BookNotFoundError();
      }
    }
  }
);

export { router as bookRoute };
