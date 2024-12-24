import { Prisma } from "@prisma/client";

export class UserItems implements Prisma.user_itemsCreateInput {
    userId: number;
    itemId: number;
    user: Prisma.UsersCreateNestedOneWithoutItemsInput;
    item: Prisma.ItemsCreateNestedOneWithoutUsersInput;
}