export interface Friend {
  userId: string;
  nickname: string;
  email: string;
  joined: Date;
  friendsSince: Date;
  avatarURL: string | null;
}

export interface InviteUser {
  userId: string;
  nickname: string;
  email: string;
  avatarURL: string | null;
  joined: Date;
}

export interface InviteWithInviter {
  invitationId: string;
  inviter: InviteUser;
}

export interface InviteWithInvitee {
  invitationId: string;
  invitee: InviteUser;
}

export interface InvitedResponse {
  invited: InviteWithInviter[];
}

export interface InviteesResponse {
  invitees: InviteWithInvitee[];
}

export interface GetFriendsResponse {
  friends: Friend[];
}
