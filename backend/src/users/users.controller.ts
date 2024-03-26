import { Controller, Get, Request } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Request() req): UserDto {
    return req.user;
  }
}
