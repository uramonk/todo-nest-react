import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(@Request() req): Promise<ItemDto[]> {
    return await this.itemsService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  async findById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ItemDto> {
    return await this.itemsService.findById({ id: id, userId: req.user.id });
  }

  @Post()
  async create(
    @Request() req,
    @Body() createItem: CreateItemDto,
  ): Promise<ItemDto> {
    return await this.itemsService.create({
      user: req.user,
      body: createItem.body,
      status: createItem.status,
    });
  }

  @Patch(':id')
  async updateToDoStatus(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItem: UpdateItemDto,
  ): Promise<ItemDto> {
    return await this.itemsService.update(
      { id: id, userId: req.user.id },
      { body: updateItem.body, status: updateItem.status },
    );
  }

  @Delete(':id')
  async delete(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.itemsService.delete({ id: id, userId: req.user.id });
  }
}
