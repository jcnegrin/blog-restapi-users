import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Login_logs } from './entities/login_logs.entity';
import { UsersModule } from './controllers/users/users.module';
import { RolesModule } from './controllers/roles/roles.module';
import { LoginLogModule } from './controllers/login-log/login-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.AWS_MYSQL_HOST,
      port: 3306,
      username: process.env.AWS_MYSQL_USERNAME,
      password: process.env.AWS_MYSQL_PASSWORD,
      database: process.env.AWS_MYSQL_DATABASE,
      entities: [User, Role, Login_logs],
      synchronize: true,
      logging: true
    }),
    UsersModule,
    RolesModule,
    LoginLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
