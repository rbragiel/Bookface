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
  invited: InviteWithInvitee[];
}

export interface InviteesResponse {
  invitees: InviteWithInviter[];
}

export interface GetFriendsResponse {
  friends: Friend[];
}

export interface GetUserUser {
  userId: string;
  nickname: string;
  email: string;
  joined: Date;
  birthday?: Date;
  avatarURL?: string;
  description?: string;
  areFriends: boolean;
  friendsSince?: Date;
  isInviter: boolean;
  isInvitee: boolean;
}

export interface GetUserResponse {
  user: GetUserUser;
}

export interface Post {
  postData: PostData;
  comments: number;
  reactions: Reaction[];
}

export interface PostData {
  postId: string;
  userId: string;
  content: string;
  title: string;
  timestamp: string;
}

enum Choice {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export interface Reaction {
  choice: Choice;
  quantity: number;
}
