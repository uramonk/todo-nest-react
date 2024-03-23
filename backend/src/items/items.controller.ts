import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Item } from './items.model';
import { ItemsService } from './items.service';
import { Status } from './status.enum';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body('id', ParseIntPipe) id: number,
    @Body('body') body: string,
  ): Item {
    const item = {
      id,
      body,
      status: Status.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.itemsService.create(item);
  }

  @Patch(':id')
  updateToDoStatus(
    @Param('id') id: number,
    @Body('status') status: Status,
  ): Item {
    return this.itemsService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return this.itemsService.delete(id);
  }
}
