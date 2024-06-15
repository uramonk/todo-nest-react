import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserDto } from './dto/user.dto';

@ApiTags('App')
@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Request() req): UserDto {
    return req.user;
  }
}
