import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Status } from './status.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ type: 'enum', enum: Status, default: Status.TODO })
  status: Status;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
