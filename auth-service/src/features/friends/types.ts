import { ApiProperty } from '@nestjs/swagger';

export class Friend {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  joined: Date;

  @ApiProperty()
  friendsSince: Date;

  @ApiProperty()
  avatarURL: string | null;
}

export class GetFriendsResponse {
  @ApiProperty({ type: [Friend] })
  friends: Friend[];
}
