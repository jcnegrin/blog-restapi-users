import { Entity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Login_logs {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    ip: string;
}