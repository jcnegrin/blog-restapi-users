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
import { LoginLogController } from './controllers/login-log/login-log.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'negrin-blog.cipyhvmh2n72.eu-west-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'Xgn4hioa73;',
      database: 'negrin_blog',
      entities: [User, Role, Login_logs],
      synchronize: true,
      logging: true
    }),
    UsersModule,
    RolesModule
  ],
  controllers: [AppController, LoginLogController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
