import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.post(
  '/api/auth/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    // check if jwt access token is valid / not expired
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRoute };
