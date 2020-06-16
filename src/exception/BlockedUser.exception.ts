import { HttpException, HttpStatus } from "@nestjs/common";

export class BlockedUserException extends HttpException {
    constructor() {
      super("You're not allowed to do that", HttpStatus.UNAUTHORIZED);
    }
  }