import { CreateUserDto } from "src/dto/users/create-user.dto";
import { UsersService } from "./users.service";
import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dto/users/login-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post("/signup")
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
    @Post("/login")
    async logIn(@Body() loginDto: LoginUserDto) {
        return await this.userService.login(loginDto);
    }
}