import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/validate-request';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { User } from '../../database/models/user';

interface UserPayload {
  id: string;
  email: string;
}

const router = express.Router();

router.post(
  '/api/auth/token',
  [body('token').notEmpty().withMessage('You must supply a token')],
  validateRequest,
  async (req: Request, res: Response) => {
    /*
      1 - Check if refresh token is valid
      2 - Find user
      3 - Generate new access token
      4 - Return token
    */

    // 1
    const { token } = req.body;

    let user: UserPayload;

    try {
      user = jwt.verify(token, process.env.JWT_REFRESH_KEY!) as UserPayload;
    } catch (error) {
      throw new NotAuthorizedError();
    }

    // 2
    /* const currentUser = await User.findOne({
      _id: user.id,
      refreshToken: token
    });

    if (!currentUser) {
      throw new NotAuthorizedError();
    } */

    // 3
    const accessToken = jwt.sign(
      {
        id: user.id, //currentuser
        email: user.email //currentuser
      },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    // 4
    res.send({ accessToken });
  }
);

export { router as authTokenRoute };
