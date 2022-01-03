interface User {
  userId: string;
  nickname: string;
  email: string;
  isActivated: boolean;
  birthday: string | null;
  avatarURL: string | null;
  description: string | null;
  role: string;
  joined: string;
  updatedAt: string;
}

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
