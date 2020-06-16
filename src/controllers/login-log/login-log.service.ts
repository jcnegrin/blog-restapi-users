import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login_logs } from 'src/entities/login_logs.entity';
import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateLogDto } from 'src/dto/CreateLogDto';

@Injectable()
export class LoginLogService {
    constructor(
        @InjectRepository(Login_logs)
        private loginLogsRepository: Repository<Login_logs>,
    ) {}

    async saveLog(log: CreateLogDto): Promise<void>{
        await this.loginLogsRepository.save(log);
    }

    async findUserConnectionLogs(userId: string): Promise<Login_logs[]> {
        const userConnectionLogs: Login_logs[] = await getRepository(Login_logs)
            .createQueryBuilder("login_logs")
            .where('login_logs.userId = :userId', {userId})
            .getMany();
        return userConnectionLogs;
    }
}
