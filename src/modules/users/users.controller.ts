import { Controller, Get, Post, Body, Delete, UseGuards, Request, Put, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../authen/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('users')
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This username has already been registered',
      }, HttpStatus.BAD_REQUEST);
    }
    return
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findByID(@Request() req) {
    const result = await this.usersService.findByID(req.user.id);
    if (result) {
      const { id, username, password, ...info } = result
      return info
    }
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User Not Found',
    }, HttpStatus.NOT_FOUND);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+req.user.id, updateUserDto);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Update Fail',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users')
  async remove(@Request() req) {
    const result = await this.usersService.remove(req.user.id);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Delete Fail',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/orders')
  async order(@Request() req, @Body('orders') orders) {
    const result = await this.usersService.order(req.user.id, orders);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Order Fail',
      }, HttpStatus.BAD_REQUEST);
    }
    return result
  }
}
