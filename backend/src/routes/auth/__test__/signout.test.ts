import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../../app';
import { User } from '../../../database/models/user';

it('clears the refresh token after signing out', async () => {
  const signupResponse = await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const { user, accessToken } = signupResponse.body;

  const currentUser = await User.findById(user.id);
  expect(currentUser!.refreshToken).toBeDefined();

  await request(app)
    .post('/api/auth/signout')
    .set('Authorization', `${accessToken}`)
    .send({})
    .expect(200);

  const loggedOutUser = await User.findById(user.id);
  expect(loggedOutUser!.refreshToken).toBeUndefined();
});

it('should get 403 when token has expired', async (done) => {
  const email = 'test@test.com';
  const password = 'password';

  const user = User.build({ email, password });

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!,
    {
      expiresIn: '1s'
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_REFRESH_KEY!
  );

  user.set({
    refreshToken
  });
  await user.save();

  setTimeout(async () => {
    await request(app)
      .post('/api/auth/signout')
      .set('Authorization', `${accessToken}`)
      .send({})
      .expect(403);

    done();
  }, 1500);
});
