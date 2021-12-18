enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
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
  role: UserRole;
}

export interface UserWithToken extends User {
  token: string;
}
