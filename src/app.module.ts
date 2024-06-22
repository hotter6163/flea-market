import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  providers: [],
  controllers: [],
  imports: [ItemsModule, TypeOrmModule.forRoot()],
  exports: [],
})
export class AppModule {}
