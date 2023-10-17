import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.save(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }
}
