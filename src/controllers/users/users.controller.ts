import { Controller, Get, Req, Post, Body, UnauthorizedException, Ip, BadRequestException } from '@nestjs/common';
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

    @Post('signup')
    async createNew(@Body() createUser: CreateUserDto, @Ip() ip: string): Promise<any> {

        if (createUser.first_name === '' || createUser.last_name === '' || createUser.email === '' || createUser.password === '') {
            throw new BadRequestException();
        }

        const user = await this.userService.findByEmail(createUser.email);
        if (!user) {
            const password_hash = await this.userService.generateSaltedPassword(createUser.password);
            createUser.password = password_hash;
            const newUser: User = await this.userService.CreateUser(createUser);
            this.userService.addLoginLog(newUser, ip);
            const jwt = this.userService.generateJWT(newUser);
            return jwt;
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
