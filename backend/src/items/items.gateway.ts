import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { ItemsService } from "./items.service";
import { Socket } from "socket.io";
import { CreateItemDto } from "src/dto/items/create-item.dto";
import { UpdateItemDto } from "src/dto/items/update-item.dto";

@WebSocketGateway({
    cors: {
        origin: '*',
    }

})
export class ItemsGateway {
    constructor(private itemsService: ItemsService) { }
    @WebSocketServer() server: Server;

    @SubscribeMessage('item')
    async handleItems(@MessageBody() body: string) {
        const message = JSON.parse(body);

        // Check if the message has an action (create or update)
        if (message.action === 'create') {
            const item: CreateItemDto = message.data;
            try {
                const createdItem = await this.itemsService.create(item);
                console.log("Received and Created Item:", createdItem);
                this.server.emit('item', createdItem); // Emit the created item
            } catch (error) {
                console.error("Error while creating item:", error);
            }
        }
        else if (message.action === 'update') {
            const item: UpdateItemDto = message.data;
            const itemId = message.id;  // Get the item ID for updating
            try {
                const updatedItem = await this.itemsService.update(itemId, item);
                console.log("Received and Updated Item:", updatedItem);
                this.server.emit('item', updatedItem); // Emit the updated item
            } catch (error) {
                console.error("Error while updating item:", error);
            }
        }
    }


    afterInit(server: Server) {
        console.log('Websocket server initialized', server);
    }

    handleDisconnect(client: Socket) {
        console.log(`Disconnected ${client.id}`)
    }

    handleConnection(client: Socket) {
        console.log(`Connected ${client.id}`)
    }
}