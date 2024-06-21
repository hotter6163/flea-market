import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';

@Module({
  providers: [],
  controllers: [],
  imports: [ItemsModule],
  exports: [],
})
export class AppModule {}
