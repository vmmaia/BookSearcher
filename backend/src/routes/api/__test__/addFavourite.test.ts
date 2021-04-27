import request from 'supertest';
import { app } from '../../../app';
import { Favourites } from '../../../database/models/favourites';
import { signup } from '../../../test/signup';

it('returns 400 if no book is in request body', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .put('/api/addFavourite')
    .set('Authorization', `${accessToken}`)
    .send()
    .expect(400);

  expect(response.body.errors.length).toEqual(2);

  expect(
    response.body.errors.find(
      (e: { message: string; field: string }) =>
        e.message === 'Invalid value' && e.field === 'book'
    )
  ).not.toEqual(undefined);

  expect(
    response.body.errors.find(
      (e: { message: string; field: string }) =>
        e.message === 'You must provide a valid favourite list' &&
        e.field === 'book'
    )
  ).not.toEqual(undefined);
});

it('returns 200 and stores book in database', async () => {
  const { accessToken, user } = await signup();

  const book = {
    key: 'key1',
    title: 'title1',
    author_name: ['author1'],
    cover_i: 'cover1'
  };

  const response = await request(app)
    .put('/api/addFavourite')
    .set('Authorization', `${accessToken}`)
    .send({ book })
    .expect(200);

  expect(response.body.length).toEqual(1);
  expect(response.body[0]).toEqual(book);

  const storedFavourites = await Favourites.findOne({
    userId: user.id
  });

  expect(storedFavourites).toBeDefined();
  expect(storedFavourites!.books.find((b) => b.key === book.key)).not.toEqual(
    undefined
  );
});
