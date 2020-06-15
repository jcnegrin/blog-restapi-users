import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Request } from 'express';
import { CreateRoleDto } from 'src/dto/CreateRoleDto';
import { Role } from 'src/entities/role.entity';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<any> {
        return await this.rolesService.findAll();
    }

    @Post()
    async createRole(@Body() createRol: CreateRoleDto): Promise<Role> {
        try {
            const role: Role = await this.rolesService.create(createRol);
            return role;
        } catch (error) {
            console.log(error);
            
        }
    }
}
