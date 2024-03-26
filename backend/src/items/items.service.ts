import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toDto, toDtoArray } from 'src/common/common';
import { Repository } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(userId: number): Promise<ItemDto[]> {
    return toDtoArray(
      ItemDto,
      await this.itemRepository.findBy({ userId: userId }),
    );
  }

  async findById(id: number, userId: number): Promise<ItemDto | null> {
    return toDto(
      ItemDto,
      await this.itemRepository.findOneBy({ id: id, userId: userId }),
    );
  }

  async create(userId: number, item: CreateItemDto): Promise<ItemDto> {
    const createItem = {
      body: item.body,
      status: item.status,
      userId: userId,
    } as Item;
    return toDto(ItemDto, await this.itemRepository.save(createItem));
  }

  async update(
    id: number,
    userId: number,
    item: UpdateItemDto,
  ): Promise<ItemDto> {
    const targetItem = await this.findById(id, userId);
    if (!targetItem) {
      throw new NotFoundException();
    }
    // bodyとstatusのみ更新
    const updateItem = {
      ...targetItem,
      body: item.body,
      status: item.status,
    } as Item;
    return toDto(ItemDto, await this.itemRepository.save(updateItem));
  }

  async delete(id: number, userId: number): Promise<void> {
    const targetItem = await this.findById(id, userId);
    if (!targetItem) {
      throw new NotFoundException();
    }
    await this.itemRepository.delete(id);
  }
}
