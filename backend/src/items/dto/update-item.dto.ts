import { IsEnum, Length } from 'class-validator';

import { Status } from '../status.enum';

export class UpdateItemDto {
  @Length(1, 255)
  body: string;

  @IsEnum(Status)
  status: Status;
}
