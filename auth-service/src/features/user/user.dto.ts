import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserWithCreatedAt, UserRole, User } from './user.model';

export class UserRegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 4, maxLength: 25 })
  @IsNotEmpty()
  @Length(4, 25)
  nickname: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 40,
  })
  @IsNotEmpty()
  @Length(6, 40)
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserSearchDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatarURL: string | null;
}

export class UsersSearchResultDto {
  @ApiProperty({ type: [UserSearchDto] })
  users: UserSearchDto[];
}

export class UserDto implements UserWithCreatedAt {
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

export class UserWithTokenDto extends UserDto {
  @ApiProperty()
  token: string;
}

export class UserWithFriendsDto extends UserDto {
  @ApiProperty()
  friends: User[];
}

export class GetSingleUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  joined: Date;

  @ApiPropertyOptional()
  birthday?: Date;

  @ApiPropertyOptional()
  avatarURL?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  areFriends: boolean;

  @ApiPropertyOptional()
  friendsSince?: Date;

  @ApiProperty()
  isInviter: boolean;

  @ApiProperty()
  isInvitee: boolean;
}

export class GetUserDto {
  @ApiProperty({ type: GetSingleUser })
  user: GetSingleUser;
}

export class UpdateSelfDto {
  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  birthday?: string;

  @ApiPropertyOptional()
  avatarURL?: string;
}
