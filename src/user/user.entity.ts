import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from './roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: Roles.User })
  role: Roles;
}
