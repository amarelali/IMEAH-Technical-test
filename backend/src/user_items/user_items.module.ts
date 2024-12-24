import { Module } from "@nestjs/common";
import { UserItemsController } from "./user_items.controller";
import { UserItemsService } from "./user_items.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [UserItemsController],
    providers: [UserItemsService, PrismaService],
})
export class UserItemsModule { }