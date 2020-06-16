import { User } from "src/entities/user.entity";

export class CreateLogDto {
    user: User;
    ip: string;
}