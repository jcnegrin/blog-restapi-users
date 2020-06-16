/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { Login_logs } from 'src/entities/login_logs.entity';
import { LoginLogService } from './login-log.service';

@Controller('login-logs')
export class LoginLogController {

    constructor(private loginLogsService: LoginLogService) {}

    @Get()
    getConnectionLogs() {
        throw new BadRequestException();
    }

    @Get(':userId')
    async getAllUserConnectionLogs(@Param() params): Promise<Login_logs[]> {

        if (!params.userId) {
            throw new BadRequestException();
        }
        const userLogs: Login_logs[] = await this.loginLogsService.findUserConnectionLogs(params.userId)
        return userLogs;
    }

}
