import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { User } from 'src/entities/user.entity';
import { UserExistException } from 'src/exception/userExist.exception';
import { LoginDto } from 'src/dto/LoginDto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<any> {
        return await this.userService.findAll();
    }

    @Post()
    async createNew(@Body() createUser: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(createUser.email);
        if (!user) {
            const newUser: User = await this.userService.save(createUser);
            return newUser;
        } else {
            throw new UserExistException();
        }
    }

    @Post('login')
    login(@Body() login: LoginDto): Promise<any> {
        return ;
    }
}
