import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, Length } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @Length(1, 255)
  body: string;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;
}
