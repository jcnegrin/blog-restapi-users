import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/controllers/roles/roles.module';
import { RolesService } from 'src/controllers/roles/roles.service';
import { LoginLogModule } from '../login-log/login-log.module';
import { LoginLogService } from '../login-log/login-log.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule, LoginLogModule],
    providers: [UsersService, RolesService, LoginLogService],
    controllers: [UsersController],
  })
export class UsersModule {}
