import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/controllers/roles/roles.module';
import { RolesService } from 'src/controllers/roles/roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    providers: [UsersService, RolesService],
    controllers: [UsersController],
  })
export class UsersModule {}
