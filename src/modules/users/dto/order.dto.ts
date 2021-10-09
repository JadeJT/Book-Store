import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {

    @ApiProperty({ type: [Number], default: [1, 4] })
    @IsArray()
    orders: number[];

}