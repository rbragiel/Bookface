import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  userId: string;

  @Column
  nickname: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isActivated: boolean;

  @CreatedAt
  joined: Date;

  @AllowNull
  @Column(DataType.DATEONLY)
  birthday?: Date;

  @AllowNull
  @Column
  avatarURL?: string;

  @AllowNull
  @Column(DataType.TEXT)
  description: string;
}
