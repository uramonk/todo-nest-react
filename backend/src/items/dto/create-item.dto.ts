import { Status } from '@prisma/client';
import { IsEnum, Length } from 'class-validator';

export class CreateItemDto {
  @Length(1, 255)
  body: string;

  @IsEnum(Status)
  status: Status;
}
