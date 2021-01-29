import { Roles } from '../roles.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Roles;
}
