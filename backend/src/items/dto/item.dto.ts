import { Status } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ItemDto {
  constructor(
    id: number,
    body: string,
    status: Status,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.body = body;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

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
