import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { encrypt } from '../../utils/helper'
import { User } from './interfaces/user.interface';
import { OrderEntity } from './entities/order.entity';
import { BooksService } from '../books/books.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const checkUser = await this.usersRepository.findOne({ where: { username: createUserDto.username } });
    if (checkUser) {
      return undefined
    }
    const hashPassword = await encrypt(createUserDto.password)
    const user: CreateUserDto = { ...createUserDto, password: hashPassword }
    return await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findByID(id: number): Promise<User | undefined> {
    let profile = await this.usersRepository.findOne({ where: { id } });
    let orders = await this.ordersRepository.find({ where: { orderer_id: id } })
    if (orders.length > 0) {
      const books = orders.map((order) => order.book_id)
      const result = { ...profile, books }
      return result
    }
    return profile
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, updateUserDto);
    return result.affected === 1
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    return result.affected === 1
  }

  async order(ordererId: number, ordersId: number[]) {
    const available = await new BooksService().checkAvaliable(ordersId)
    if (available.length === ordersId.length) {
      const price: number = available.reduce((total, book) => total += book.price, 0)
      for (let i = 0; i < available.length; i++) {
        await this.ordersRepository.save({ orderer_id: ordererId, book_id: available[i].id })
      }
      return { price }
    }
    return false
  }

}
