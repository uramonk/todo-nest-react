import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
