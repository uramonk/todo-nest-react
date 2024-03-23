import { Status } from './status.enum';

export interface Item {
  id: number;
  body: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
