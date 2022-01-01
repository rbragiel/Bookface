import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class FriendPair extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userOneId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userTwoId: string;

  @CreatedAt
  created: Date;
}
