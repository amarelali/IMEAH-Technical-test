import { PrismaService } from "src/prisma.service";
import { Items } from "./items.model";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "src/dto/items/create-item.dto";
import { UpdateItemDto } from "src/dto/items/update-item.dto";

@Injectable()
export class ItemsService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createItemsDto: CreateItemDto): Promise<Items> {
        try {
            const { title, description } = createItemsDto;

            return await this.prisma.items.create({
                data: {
                    title,
                    description,
                }
            });
        } catch (error) {
            console.error(`error from create new item: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during creating new Item.');
        }
    }
    async update(id:number, updateItemDto: UpdateItemDto): Promise<Items> {
        try {
            const { title, description } = updateItemDto;

            const updatedItem = await this.prisma.items.update({
                where: { id },
                data: {
                    ...(title && { title }),
                    ...(description && { description }),
                }
            });
            if (!updatedItem) {
                throw new NotFoundException("Item not found");
            }
            return updatedItem;

        } catch (error) {
            console.error(`error from update item: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during update item.');
        }
    }
    async findAll(): Promise<Items[]> {
        try {
            return await this.prisma.items.findMany();
        } catch (error) {
            console.error(`error from findAll items: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during find all items.');
        }
    }

    async delete(id: number) {
        try {
            const deletedItem = await this.prisma.items.delete({
                where: { id }
            });
            if (!deletedItem) {
                throw new NotFoundException("Item not found");
            }
            return deletedItem;
        } catch (error) {
            console.error(`error from deleteItem: ,${error}`);
            throw new InternalServerErrorException('An unexpected error occurred during delete item.')
        }

    }
}