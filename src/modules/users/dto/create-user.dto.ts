import { IsString } from 'class-validator'

export class CreateUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    date_of_birth: string;
}
