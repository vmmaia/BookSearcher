import request from 'supertest';
import { app } from '../../../app';
import { Favourites } from '../../../database/models/favourites';
import { signup } from '../../../test/signup';

it('returns empty array if there are no favourites in database', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/favourites')
    .set('Authorization', `${accessToken}`)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(0);
});

it('returns 200 and list of favourites from database', async () => {
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
    .post('/api/favourites')
    .set('Authorization', `${accessToken}`)
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(2);

  expect(
    response.body.find((b: { key: string }) => b.key === book1.key)
  ).not.toEqual(undefined);
  expect(
    response.body.find((b: { key: string }) => b.key === book2.key)
  ).not.toEqual(undefined);
});
