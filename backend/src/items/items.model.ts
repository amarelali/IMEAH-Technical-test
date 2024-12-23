import { Prisma } from "@prisma/client";

export class Items implements Prisma.ItemsCreateInput {
    title: string;
    description: string;
    timestamp: Date; 
}