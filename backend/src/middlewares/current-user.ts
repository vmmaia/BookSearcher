import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../errors/forbidden-error';
import { JwtExpiredError } from '../errors/jwt-expired-error';
import { User } from '../database/models/user';

interface UserPayload {
  id: string;
  email: string;
}

// This gives the optional parameter of currentUser
// to the Request type object from Express
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization,
      process.env.JWT_KEY!
    ) as UserPayload;

    // Add check with redis
    /* const user = await User.findById(payload.id);

    if (!user) {
      throw new Error();
    } */

    req.currentUser = payload;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new JwtExpiredError();
    }
    throw new ForbiddenError();
  }

  next();
};
