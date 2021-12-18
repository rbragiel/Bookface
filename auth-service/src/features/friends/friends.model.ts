import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table
export class FriendPair extends Model {
  @Column
  userOneId: string;

  @Column
  userTwoId: string;

  @CreatedAt
  created: Date;
}
