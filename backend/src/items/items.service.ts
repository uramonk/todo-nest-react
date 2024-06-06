import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { toDto, toDtoArray } from 'src/common/common';
import { PrismaService } from 'src/prisma.service';

import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(itemWhereInput: Prisma.ItemWhereInput): Promise<ItemDto[]> {
    return toDtoArray(
      ItemDto,
      await this.prisma.item.findMany({ where: itemWhereInput }),
    );
  }

  async findById(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<ItemDto | null> {
    return toDto(
      ItemDto,
      await this.prisma.item.findUnique({ where: itemWhereUniqueInput }),
    );
  }

  async create(itemCreateInput: Prisma.ItemCreateInput): Promise<ItemDto> {
    return toDto(
      ItemDto,
      await this.prisma.item.create({ data: itemCreateInput }),
    );
  }

  async update(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
    itemUpdateInput: Prisma.ItemUpdateInput,
  ): Promise<ItemDto> {
    const targetItem = await this.findById(itemWhereUniqueInput);
    if (!targetItem) {
      throw new NotFoundException();
    }

    return toDto(
      ItemDto,
      await this.prisma.item.update({
        where: itemWhereUniqueInput,
        data: itemUpdateInput,
      }),
    );
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
