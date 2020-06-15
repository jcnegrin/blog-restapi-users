import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RolesService],
    controllers: [RolesController],
    exports: [TypeOrmModule]
  })
export class RolesModule {}
