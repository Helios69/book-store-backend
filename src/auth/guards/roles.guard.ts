import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/roles.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const hasRole = async (userId: number, requiredRoles: Role[]) => {
      const { role } = await this.userService.getById(userId);

      return requiredRoles.includes(role) || !requiredRoles;
    };

    return hasRole(userId, requiredRoles);
  }
}
