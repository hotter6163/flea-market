import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [],
  controllers: [],
  imports: [ItemsModule, TypeOrmModule.forRoot(), AuthModule],
  exports: [],
})
export class AppModule {}
