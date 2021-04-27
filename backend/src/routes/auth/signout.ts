import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { ForbiddenError } from '../../errors/forbidden-error';
import { User } from '../../database/models/user';

const router = express.Router();

router.post(
  '/api/auth/signout',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    /*
      1 - Check if user exists in database
      2 - Reset jwt refresh token
      3 - Save changes
      4 - Return
    */

    // 1
    const user = await User.findById(req.currentUser!.id);

    if (!user) {
      throw new ForbiddenError();
    }

    // 2
    user.set({ refreshToken: undefined });

    // 3
    await user.save();

    // 4
    res.send({});
  }
);

export { router as signoutRoute };
