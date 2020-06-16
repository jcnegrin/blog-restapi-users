import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { Role } from 'src/entities/role.entity';
import { RolesService } from 'src/controllers/roles/roles.service';
import {getRepository} from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private rolesService: RolesService
    ) {}

    async CreateUser(newUser: CreateUserDto): Promise<User>
    {
        const userRole: Role = await this.rolesService.findRoleByName('User');
        const user = {
            ...newUser,
            enabled: true,
            role: userRole            
        }
        const addedUser: User = await this.usersRepository.save(user);
        delete addedUser.password;
        return addedUser;
    }

    async generateSaltedPassword(plainPassword: string) : Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    }

    async comparePassword(plainTextPassword: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hash);
    }

    generateJWT(user: User): string {
        delete user.password;
        return jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
    }

    findByEmail(email: string): Promise<User> {
        const user: Promise<User> = getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", {email})
        .getOne();
        return user;
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
