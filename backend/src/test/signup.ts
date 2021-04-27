import jwt from 'jsonwebtoken';
import { User } from '../database/models/user';

export const signup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const user = User.build({ email, password });

  const payload = {
    id: user.id,
    email: user.email
  };

  const accessToken = jwt.sign(payload, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY!);

  user.set({
    refreshToken
  });
  await user.save();

  return { user, accessToken };
};
