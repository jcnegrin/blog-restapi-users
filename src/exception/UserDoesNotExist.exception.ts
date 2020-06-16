import { HttpException, HttpStatus } from "@nestjs/common";

export class UserDoesNotExistException extends HttpException {
    constructor() {
      super('User does not exists', HttpStatus.NOT_FOUND);
    }
  }