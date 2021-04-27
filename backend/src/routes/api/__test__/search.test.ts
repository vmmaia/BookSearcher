import request from 'supertest';
import { app } from '../../../app';
import { signup } from '../../../test/signup';

it('returns empty if there are no matches', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/search')
    .set('Authorization', `${accessToken}`)
    .send({ query: 'this_should_return_no_results' })
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body).toEqual([]);
});

it('returns no more than 10 results', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/search')
    .set('Authorization', `${accessToken}`)
    .send({ query: 'Charles Dickens' })
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body.length <= 10).toBe(true);
});

it('returns results in correct format', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .post('/api/search')
    .set('Authorization', `${accessToken}`)
    .send({ query: 'Charles Dickens' })
    .expect(200);

  expect(response.body).toBeDefined();

  expect(typeof response.body[0].key).toBe('string');
  expect(typeof response.body[0].title).toBe('string');
  expect(typeof response.body[0].cover_i).toBe('string');
  expect(Array.isArray(response.body[0].author_name)).toBe(true);
});
