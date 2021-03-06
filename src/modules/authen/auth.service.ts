import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/utils/helper';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user) {
            const isMatch = await compare(pass, user.password)
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}