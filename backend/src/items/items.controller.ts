import { ItemsService } from "./items.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateItemDto } from "src/dto/items/create-item.dto";
import { UpdateItemDto } from "src/dto/items/update-item.dto";

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    // Get all items
    @Get("/")
    async findAll() {
        return await this.itemsService.findAll();
    }
    // Create an item
    @Post("/")
    async create(@Body() createItemDto : CreateItemDto) {
        return await this.itemsService.create(createItemDto);
    }
    // Update an item by id
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
        return await this.itemsService.update(+id, updateItemDto);
    }
    // delete item by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.itemsService.delete( +id );
    }

}