import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import * as bcrypt from "bcryptjs"
import { LoginUserDto } from "src/dto/login-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        try {
            const { name, email, password } = createUserDto;
            //check if user already exist
            const existingUser = await this.prisma.users.findUnique({ where: { email } });
            if (existingUser) {
                throw new BadRequestException('Email is already taken');
            }
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            return this.prisma.users.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });
        } catch (error) {
            console.error(`error: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during registration.');
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<Partial<Users>> {
        try {
            const { email, password } = loginUserDto;

            const user = await this.prisma.users.findUnique({ where: { email } })
            if (!user) {
                throw new BadRequestException('Invalid user or password')
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new BadRequestException('Invalid email or password');
            }
            const { password: _, ...userWithoutPassword } = user;

            return userWithoutPassword;
        } catch (error) {
            console.error(`error: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during login.');
        }
    }
}