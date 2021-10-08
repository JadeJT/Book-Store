import { Controller, Get, Post, Body, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../authen/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getInfo(@Request() req) {
    const { id, username, password, ...info } = await this.usersService.getInfo(req.id);
    return info
  }

  @UseGuards(JwtAuthGuard)
  @Put('users')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users')
  remove(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
