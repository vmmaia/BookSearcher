import { CustomError } from './custom-error';

export class BadSearchError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Book search error');

    Object.setPrototypeOf(this, BadSearchError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Book search error.' }];
  }
}
