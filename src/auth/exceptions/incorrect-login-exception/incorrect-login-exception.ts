import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectLoginException extends HttpException {
  constructor() {
    super('Login erróneo', HttpStatus.FORBIDDEN);
  }
}
