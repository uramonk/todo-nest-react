import { Test, TestingModule } from '@nestjs/testing';
import { Item, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { any, DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

const date = new Date();
const items = [
  {
    id: 1,
    name: 'test',
    status: Status.TODO,
    createdAt: date,
    updatedAt: date,
  } as unknown as Item,
  {
    id: 1,
    name: 'test',
    status: Status.TODO,
    createdAt: date,
    updatedAt: date,
  } as unknown as Item,
];

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemsServiceMock: DeepMockProxy<ItemsService>;

  beforeEach(async () => {
    itemsServiceMock = mockDeep<ItemsService>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService, PrismaService],
    })
      .overrideProvider(ItemsService)
      .useValue(itemsServiceMock)
      .compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    const expected = items;
    itemsServiceMock.findAll.calledWith(any()).mockResolvedValue(expected);

    //expect(controller).toBeDefined();
    expect(controller.findAll({ user: { id: 1 } })).resolves.toEqual(expected);
  });
});
