import { FriendPair } from '../friends/friends.model';
import {
  AllowNull,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';

export interface IUser {
  userId: string;
  nickname: string;
  email: string;
  password: string;
  isActivated: boolean;
  joined: Date;
  birthday?: Date;
  avatarURL?: string;
  description?: string;
  friends: User[];
}

@Table
export class User extends Model implements IUser {
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

  @BelongsToMany(() => User, () => FriendPair, 'userOneId', 'userTwoId')
  friends: User[];
}

export class UserModel {
  userId: string;
  nickname: string;
  email: string;

  @Exclude()
  password: string;

  isActivated: boolean;
  joined: Date;
  birthday?: Date;
  avatarURL?: string;
  description?: string;
  friends: User[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UserWithToken extends UserModel {
  token: string;
}
