import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidLoginDataException extends HttpException {
    constructor() {
      super('Login data invalid', HttpStatus.BAD_REQUEST);
    }
  }