import { HttpException, HttpStatus } from '@nestjs/common';

export class InactiveUserException extends HttpException {
  constructor() {
    super('El usuario está inactivo', HttpStatus.UNAUTHORIZED);
  }
}
