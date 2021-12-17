import { FriendPair } from '../friends/friends.model';
import {
  AllowNull,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Invitation } from '../invitation/invitation.model';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

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
  role: UserRole;
}

export interface IUserWithCreatedAt extends IUser {
  createdAt: Date;
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

  @HasMany(() => Invitation, 'inviterId')
  invites: Invitation[];

  @HasMany(() => Invitation, 'inviteeId')
  sendInvites: Invitation;

  @Column({
    type: DataType.ENUM({ values: Object.keys(UserRole) }),
  })
  role: UserRole;
}

export class UserModel implements IUserWithCreatedAt {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  isActivated: boolean;

  @ApiProperty()
  joined: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  birthday?: Date;

  @ApiPropertyOptional()
  avatarURL?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UserWithToken extends UserModel {
  @ApiProperty()
  token: string;
}

export class UserWithFriends extends UserModel {
  @ApiProperty()
  friends: User[];
}
