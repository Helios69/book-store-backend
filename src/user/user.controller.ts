import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Get(':email')
  getByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getByEmail(email);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number): Promise<User | void> {
    return this.userService.removeUser(id);
  }
}
