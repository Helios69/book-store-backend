import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post('/sign-in')
  async getAuthenticatedUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.getAuthenticatedUser(email, password);
    const token = this.authService.getJwtToken(user.id, user.role);
    return token;
  }
}
