import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { UserItemsModule } from './user_items/user_items.module';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ItemsModule,
    UserItemsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
