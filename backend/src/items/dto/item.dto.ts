import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

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

  @ApiProperty()
  id: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
