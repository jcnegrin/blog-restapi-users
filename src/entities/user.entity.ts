/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, PrimaryColumn, UpdateDateColumn, JoinColumn, JoinTable } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    enabled: boolean;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @ManyToOne(
        type => Role, 
        role => role.id)
    @JoinTable()
    role: Role;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}