import { Roles } from 'src/user/roles.enum';

export interface TokenPayload {
  userId: number;
  role: Roles;
}
