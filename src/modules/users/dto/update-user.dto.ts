import { IsString } from 'class-validator';

export class UpdateUserDto {
    
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    date_of_birth: string
}
