import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { CreateRoleDto } from 'src/dto/CreateRoleDto';
import {getRepository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    create(role: CreateRoleDto): Promise<Role>{
        return this.rolesRepository.save(role);
    }

    findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    findOne(id: string): Promise<Role> {
        return this.rolesRepository.findOne(id);
    }

    findRoleByName(name: string): Promise<Role> {
        const role = getRepository(Role)
        .createQueryBuilder('role')
        .where("role.name = :name", {name})
        .getOne();
        return role;
    }

}
