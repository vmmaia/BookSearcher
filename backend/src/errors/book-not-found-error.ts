import { CustomError } from './custom-error';

export class BookNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Book not found');

    Object.setPrototypeOf(this, BookNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Book not Found' }];
  }
}
