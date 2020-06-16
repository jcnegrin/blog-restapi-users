import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login_logs } from 'src/entities/login_logs.entity';
import { LoginLogController } from './login-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Login_logs])],
  providers: [LoginLogService],
  controllers: [LoginLogController],
  exports: [TypeOrmModule]
})
export class LoginLogModule {}
