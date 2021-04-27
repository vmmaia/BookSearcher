import request from 'supertest';
import { app } from '../../../app';
import { signup } from '../../../test/signup';

it('returns 404 if workId does not exist', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/book')
    .set('Authorization', `${accessToken}`)
    .send({ workId: 'this_id_is_invalid' })
    .expect(404);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors.length).toEqual(1);
  expect(response.body.errors[0].message).toEqual('Book not Found');
});

it('returns a book in the specified format', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/book')
    .set('Authorization', `${accessToken}`)
    .send({ workId: 'OL76458W' })
    .expect(200);

  expect(typeof response.body.key).toBe('string');
  expect(typeof response.body.title).toBe('string');
  expect(typeof response.body.description).toBe('string');
  expect(Array.isArray(response.body.covers)).toBe(true);
  expect(Array.isArray(response.body.author_name)).toBe(true);
});
