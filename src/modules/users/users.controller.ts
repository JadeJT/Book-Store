import { Controller, Get, Post, Body, Delete, UseGuards, Request, Put, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../authen/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';

@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('users')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'The register success.' })
  @ApiResponse({ status: 400, description: 'The register fail.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This username has already been registered',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiResponse({ status: 200, description: 'Get user success.' })
  @ApiResponse({ status: 404, description: 'Get user fail.' })
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
  @ApiResponse({ status: 200, description: 'Update success.' })
  @ApiResponse({ status: 400, description: 'Update fail.' })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+req.user.id, updateUserDto);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Update Fail',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users')
  @ApiResponse({ status: 200, description: 'Delete success.' })
  @ApiResponse({ status: 400, description: 'Delete fail.' })
  async remove(@Request() req) {
    const result = await this.usersService.remove(req.user.id);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Delete Fail',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/orders')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Order success.' })
  @ApiResponse({ status: 400, description: 'Order fail.' })
  async order(@Request() req, @Body() body: OrderDto) {
    const result = await this.usersService.order(req.user.id, body.orders);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Order Fail',
      }, HttpStatus.BAD_REQUEST);
    }
    return result
  }
}
