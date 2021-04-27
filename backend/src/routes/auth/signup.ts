import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { User } from '../../database/models/user';

const router = express.Router();

router.post(
  '/api/auth/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    /*
      1 - check if email already exists
      2 - create new user
      3 - generate access token
      4 - generate refresh token
      5 - save user in database
      6 - return user and access token
    */

    // 1
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use.');
    }

    // 2
    const user = User.build({ email, password });

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

    user.set({ refreshToken });

    // 5
    await user.save();

    // 6
    res.status(201).send({ user, accessToken });
  }
);

export { router as signupRoute };
