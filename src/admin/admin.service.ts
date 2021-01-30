import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Role } from 'src/user/roles.enum';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async adminSignUp(createAdminDto: CreateAdminDto): Promise<User | void> {
    const isAdminExists = await this.usersRepository.findOne({
      role: Role.Admin,
    });
    if (isAdminExists) {
      throw new HttpException(
        'Forbidden! Admin already exists!',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashedPassword = await hash(createAdminDto.password, 10);
    const admin = this.usersRepository.create({
      ...createAdminDto,
      password: hashedPassword,
      role: Role.Admin,
    });
    await this.usersRepository.save(admin);
    return admin;
  }
}
