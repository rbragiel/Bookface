import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Invitation extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  invitationId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  inviterId: string;

  @BelongsTo(() => User, 'inviterId')
  inviter: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  inviteeId: string;

  @BelongsTo(() => User, 'inviteeId')
  invitee: User;
}
