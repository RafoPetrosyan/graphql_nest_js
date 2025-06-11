// src/kroger/kroger.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { KrogerService } from './kroger.service';
import { KrogerToken } from './entities/kroger-token.entity';
import { KrogerController } from './kroger.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([KrogerToken])],
  providers: [KrogerService],
  exports: [KrogerService],
  controllers: [KrogerController],
})
export class KrogerModule {}
