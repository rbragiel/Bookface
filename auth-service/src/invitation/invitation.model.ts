import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ timestamps: false })
export class Invitation extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  inviterId: string;

  @BelongsTo(() => User, 'inviterId')
  inviter: User;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  inviteeId: string;

  @BelongsTo(() => User, 'inviteeId')
  invitee: User;

  @CreatedAt
  created: Date;
}
