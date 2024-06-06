import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsService, PrismaService],
  controllers: [ItemsController],
})
export class ItemsModule {}
