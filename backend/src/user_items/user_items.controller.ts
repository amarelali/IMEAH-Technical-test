import { CreateUserItemDto } from "src/dto/user_items/create-user-items.dto";
import { UserItemsService } from "./user_items.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";


@Controller('user_items')
export class UserItemsController {
    constructor(private readonly itemsService: UserItemsService) { }

    // Get all items
    @Get("/")
    async findAll() {
        return await this.itemsService.findAll();
    }
    // Create an item
    @Post("/")
    async create(@Body() createUserItemDto : CreateUserItemDto) {
        return await this.itemsService.create(createUserItemDto);
    }
    @Get("/userId/:userId")
    async getUserItems(@Param('userId') userId: number) {
        return await this.itemsService.getUserItems(+userId);
    }

}