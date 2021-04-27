import { CustomError } from './custom-error';

export class JwtExpiredError extends CustomError {
  statusCode = 403;

  constructor() {
    super('jwt expired');

    Object.setPrototypeOf(this, JwtExpiredError.prototype);
  }

  serializeErrors() {
    return [{ message: 'jwt expired' }];
  }
}
