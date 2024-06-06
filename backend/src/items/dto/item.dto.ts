import { Status } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ItemDto {
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  status: Status;

  @Expose()
  userId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
