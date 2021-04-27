import request from 'supertest';
import { app } from '../../../app';
import { Favourites } from '../../../database/models/favourites';
import { signup } from '../../../test/signup';

it('returns 400 if no book is in request body', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .put('/api/removeFavourite')
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

it('returns 200 and removes book from database', async () => {
  const { accessToken, user } = await signup();

  const book1 = {
    key: 'key1',
    title: 'title1',
    author_name: ['author1'],
    cover_i: 'cover1'
  };

  const book2 = {
    key: 'key2',
    title: 'title2',
    author_name: ['author2'],
    cover_i: 'cover2'
  };

  const favourites = Favourites.build({
    userId: user.id,
    books: [book1, book2]
  });

  await favourites.save();

  const response = await request(app)
    .put('/api/removeFavourite')
    .set('Authorization', `${accessToken}`)
    .send({ book: book1.key })
    .expect(200);

  expect(response.body.length).toEqual(1);
  expect(response.body[0]).toEqual(book2);

  const storedFavourites = await Favourites.findOne({
    userId: user.id
  });

  expect(storedFavourites).toBeDefined();
  expect(storedFavourites!.books.find((b) => b.key === book1.key)).toEqual(
    undefined
  );
  expect(storedFavourites!.books.find((b) => b.key === book2.key)).not.toEqual(
    undefined
  );
});

it('returns 200 if book does not exist in database', async () => {
  const { accessToken, user } = await signup();

  const response = await request(app)
    .put('/api/removeFavourite')
    .set('Authorization', `${accessToken}`)
    .send({ book: 'unexistent_id' })
    .expect(200);

  expect(response.body.length).toEqual(0);
});
