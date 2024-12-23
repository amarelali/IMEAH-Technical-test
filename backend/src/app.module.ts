import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ItemsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
