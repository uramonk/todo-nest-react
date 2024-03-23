import { Injectable } from '@nestjs/common';

import { User } from './users.model';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: '$2b$10$YhZIRU/bL6gKQctiariPF.8fXcnAljg0uD2uXgrRg3Ob8gvG.sVES', // changeme
    },
    {
      id: 2,
      username: 'maria',
      password: '$2b$10$HT8CQJRiX3gPABW0Zdx2z.cUqIXwpdP97BRXFblbcvmQ4ASVX0nfy', // guess
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
