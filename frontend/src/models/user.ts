export interface User {
  userId: string;
  nickname: string;
  email: string;
  isActivated: boolean;
  joined: Date;
  createdAt: Date;
  birthday?: Date;
  avatarURL?: string;
  description?: string;
}

export interface UserWithToken extends User {
  token: string;
}
