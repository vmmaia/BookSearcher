import express, { Request, Response } from 'express';

import 'express-async-errors';

import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';

import { signinRoute } from './routes/auth/signin';
import { signupRoute } from './routes/auth/signup';
import { signoutRoute } from './routes/auth/signout';
import { currentUserRoute } from './routes/auth/currentuser';
import { authTokenRoute } from './routes/auth/token';

import { searchRoute } from './routes/api/search';
import { bookRoute } from './routes/api/book';
import { getFavouritesRoute } from './routes/api/favourites';
import { addFavouritesRoute } from './routes/api/addFavourite';
import { removeFavouritesRoute } from './routes/api/removeFavourite';

import { json } from 'body-parser';

const app = express();

//Allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(json());

app.use(currentUserRoute);
app.use(signinRoute);
app.use(signoutRoute);
app.use(signupRoute);
app.use(authTokenRoute);

app.use(searchRoute);
app.use(bookRoute);

app.use(getFavouritesRoute);
app.use(addFavouritesRoute);
app.use(removeFavouritesRoute);

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
