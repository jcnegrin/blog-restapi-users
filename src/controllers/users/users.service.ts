import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { Role } from 'src/entities/role.entity';
import { RolesService } from 'src/controllers/roles/roles.service';
import {getRepository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private rolesService: RolesService
    ) {}

    async save(newUser: CreateUserDto): Promise<User>
    {
        const userRole: Role = await this.rolesService.findRoleByName('User');
        const user = {
            ...newUser,
            enabled: true,
            role: userRole            
        }
        return this.usersRepository.save(user);
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
