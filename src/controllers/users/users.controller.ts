import { Controller, Get, Req, Post, Body, UnauthorizedException, Ip } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { User } from 'src/entities/user.entity';
import { UserExistException } from 'src/exception/userExist.exception';
import { LoginDto } from 'src/dto/LoginDto';
import { InvalidLoginDataException } from 'src/exception/InvalidLoginData.exception';
import { UserDoesNotExistException } from 'src/exception/UserDoesNotExist.exception';
import { BlockedUserException } from 'src/exception/BlockedUser.exception';

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
            const password_hash = await this.userService.generateSaltedPassword(createUser.password);
            createUser.password = password_hash;
            const newUser: User = await this.userService.CreateUser(createUser);
            return newUser;
        } else {
            throw new UserExistException();
        }
    }

    @Post('login')
    async login(@Body() login: LoginDto, @Ip() ip: string): Promise<any> {
        
        if (!login.email || !login.password) {
            throw new InvalidLoginDataException();
        }

        const user: User = await this.userService.findByEmail(login.email);
        if(!user) {
            throw new UserDoesNotExistException();
        }

        if (!user.enabled) {
            throw new BlockedUserException();
        }

        const authValid = await this.userService.comparePassword(login.password, user.password);
        if (!authValid) {
            throw new UnauthorizedException();
        }

        this.userService.addLoginLog(user, ip);
        const jwt = this.userService.generateJWT(user);

        return {auth: true, token: jwt, user};
    }
}
