import request from 'supertest';
import { app } from '../../../app';
import { signup } from '../../../test/signup';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await signup();

  await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'asdfasdf'
    })
    .expect(400);
});

it('responds with both an access token and a refresh token when given valid credentials', async () => {
  await signup();

  const response = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.body.accessToken).toBeDefined();
  expect(response.body.user.refreshToken).toBeDefined();
});
