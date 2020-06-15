import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExistException extends HttpException {
    constructor() {
      super('User email already exist', HttpStatus.CONFLICT);
    }
  }