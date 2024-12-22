import { CreateUserDto } from "src/dto/create-user.dto";
import { UsersService } from "./users.service";
import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dto/login-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post("/signup")
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Post("/login")
    async logIn(@Body() loginDto: LoginUserDto) {
        return this.userService.login(loginDto);
    }
}