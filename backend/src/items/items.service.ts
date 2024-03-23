import { Injectable } from '@nestjs/common';

import { Item } from './items.model';
import { Status } from './status.enum';

@Injectable()
export class ItemsService {
  private todoItems: Item[] = [
    {
      id: 1,
      body: 'First item',
      status: Status.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): Item[] {
    return this.todoItems;
  }

  findById(id: number): Item {
    return this.todoItems.find((item) => item.id === id);
  }

  create(item: Item) {
    this.todoItems.push(item);
    return item;
  }

  updateStatus(id: number, status: Status): Item {
    const targetItem = this.findById(id);
    targetItem.status = status;
    return targetItem;
  }

  delete(id: number): string {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
    return `Item id: ${id} delete success`;
  }
}
