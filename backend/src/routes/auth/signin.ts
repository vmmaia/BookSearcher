import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { PasswordManager } from '../../services/password-manager';
import { User } from '../../database/models/user';

const router = express.Router();

router.post(
  '/api/auth/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    /*
      1 - Check if user with email exists
      2 - Chceck if passwords match
      3 - Generate access token
      4 - Generate refresh token
      5 - Save refresh token
      6 - Return user and access token
    */

    // 1
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Invalid credentials.');
    }

    // 2
    const passwordsMatch = await PasswordManager.compare(
      user.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials.');
    }

    // 3
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    // 4
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_REFRESH_KEY!
    );

    // 5
    user.set({
      refreshToken
    });

    await user.save();

    // 6
    res.status(200).send({ user, accessToken });
  }
);

export { router as signinRoute };
