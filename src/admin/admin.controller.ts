import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/sign-up')
  adminSignUp(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.adminSignUp(createAdminDto);
  }
}
