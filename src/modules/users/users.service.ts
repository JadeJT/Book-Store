import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { encrypt } from '../../utils/helper'
import { User } from './dto/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkUser = await this.usersRepository.findOne({ where: { username: createUserDto.username } });
    if (checkUser) {
      return checkUser
    }
    const hashPassword = await encrypt(createUserDto.password)
    const user: CreateUserDto = { ...createUserDto, password: hashPassword }
    return await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findByID(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, updateUserDto);
    return result.affected === 1
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    return result.affected === 1
  }
}
