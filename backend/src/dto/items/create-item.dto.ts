import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}