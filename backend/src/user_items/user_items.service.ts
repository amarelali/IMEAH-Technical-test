import { PrismaService } from "src/prisma.service";
import { UserItems } from "./user_items.model";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserItemDto } from "src/dto/user_items/create-user-items.dto";

@Injectable()
export class UserItemsService {

    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user_items.findMany();
    }
    async create(createUserItemsDto: CreateUserItemDto): Promise<Partial<UserItems>> {
        try {
            const { userId, itemId } = createUserItemsDto;
            // Check if the combination of userId and itemId already exists
            const existingRecord = await this.prisma.user_items.findUnique({
                where: {
                    "userId_itemId": {
                        userId,
                        itemId,
                    }
                },
            });
            if (existingRecord) {
                throw new ConflictException('This user-item relationship already exists.');
            }
            return await this.prisma.user_items.create({
                data: {
                    userId,
                    itemId,
                }
            });
        } catch (error) {
            console.error(`error from create new user-item: ,${error}`);
            throw new InternalServerErrorException(`${error.message}`);
        }
    }
    async getUserItems(userId: number) {
        return await this.prisma.user_items.findMany({
            where: { userId },
            include: { item: true },
        });
    }

}