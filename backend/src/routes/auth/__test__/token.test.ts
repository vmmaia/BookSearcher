import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../../app';
import { signup } from '../../../test/signup';

it('should send a new access token', async () => {
  const { user } = await signup();

  const response = await request(app)
    .post('/api/auth/token')
    .send({
      token: user.refreshToken
    })
    .expect(200);

  expect(response.body.accessToken).toBeDefined();
});

it('should answer 401 given a bad refresh token', async () => {
  const invalidRefreshToken = jwt.sign(
    {
      id: 'ergererg',
      email: 'test@test.com'
    },
    'wefwefwefwefwefwefwefwefwef'
  );

  await request(app)
    .post('/api/auth/token')
    .send({
      token: invalidRefreshToken
    })
    .expect(401);
});
