import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(itemWhereInput: Prisma.ItemWhereInput): Promise<Item[]> {
    console.log('CANNOT override service! Original service is used!');
    return await this.prisma.item.findMany({ where: itemWhereInput });
  }

  async findById(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<Item | null> {
    return await this.prisma.item.findUnique({ where: itemWhereUniqueInput });
  }

  async create(itemCreateInput: Prisma.ItemCreateInput): Promise<Item> {
    return await this.prisma.item.create({ data: itemCreateInput });
  }

  async update(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
    itemUpdateInput: Prisma.ItemUpdateInput,
  ): Promise<Item> {
    const targetItem = await this.findById(itemWhereUniqueInput);
    if (!targetItem) {
      throw new NotFoundException();
    }

    return await this.prisma.item.update({
      where: itemWhereUniqueInput,
      data: itemUpdateInput,
    });
  }

  async delete(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<void> {
    const targetItem = await this.findById(itemWhereUniqueInput);
    if (!targetItem) {
      throw new NotFoundException();
    }
    await this.prisma.item.delete({ where: itemWhereUniqueInput });
  }
}
