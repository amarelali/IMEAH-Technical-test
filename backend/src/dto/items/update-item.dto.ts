import { IsString } from "class-validator";

export class UpdateItemDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;
}