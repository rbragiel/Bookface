import { ApiProperty } from '@nestjs/swagger';

export class IniviteResponse {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class InviteUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatarURL: string | null;

  @ApiProperty()
  joined: Date;
}

class InviteWithInviter {
  @ApiProperty()
  invitationId: string;
  @ApiProperty()
  inviter: InviteUser;
}

class InviteWithInvitee {
  @ApiProperty()
  invitationId: string;
  @ApiProperty()
  invitee: InviteUser;
}

export class InvitedResponse {
  @ApiProperty({ type: [InviteWithInvitee] })
  invited: InviteWithInviter[];
}

export class InviteesResponse {
  @ApiProperty({ type: [InviteWithInviter] })
  invitees: InviteWithInvitee[];
}
