import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './item.entity';
import { Status } from './status.enum';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id: id });
  }

  async create(item: Item): Promise<Item> {
    return await this.itemRepository.save(item);
  }

  async updateStatus(id: number, status: Status): Promise<Item> {
    const targetItem = await this.findById(id);
    if (!targetItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    targetItem.status = status;
    return await this.itemRepository.save(targetItem);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
