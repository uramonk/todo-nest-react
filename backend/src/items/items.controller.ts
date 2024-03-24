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

import { Item } from './item.entity';
import { ItemsService } from './items.service';
import { Status } from './status.enum';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  async create(@Body('body') body: string): Promise<Item> {
    const item = {
      body,
      status: Status.TODO,
    } as Item;
    return await this.itemsService.create(item);
  }

  @Patch(':id')
  async updateToDoStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: Status,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.itemsService.delete(id);
  }
}
