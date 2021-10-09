import {
    Body,
    Controller,
    HttpCode,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authenService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'The validation success.' })
    @ApiResponse({ status: 403, description: 'The validation fail.' })
    async login(@Request() request, @Body() body: LoginUserDto) {
        const result = await this.authenService.login(request.user);
        return result;
    }
}
