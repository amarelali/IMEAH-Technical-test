import { IsString } from "class-validator";

export class UpdateItemDto {
    id:number;
    @IsString()
    title?: string;

    @IsString()
    description?: string;
}