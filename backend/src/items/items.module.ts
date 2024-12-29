import { Module } from "@nestjs/common";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { PrismaService } from "src/prisma.service";
import { ItemsGateway } from "./items.gateway";

@Module({
    controllers: [ItemsController],
    providers: [ItemsService, PrismaService,ItemsGateway],
    exports: [ItemsService],
})
export class ItemsModule { }