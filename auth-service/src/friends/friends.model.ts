import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class FriendPair extends Model {
  @Column
  userOneId: string;

  @Column
  userTwoId: string;
}
