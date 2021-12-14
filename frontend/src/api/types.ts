import { UserWithToken } from "../models/user";

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  nickname: string;
  password: string;
}

export interface RegisterResponse {
  success: true;
}

export interface IUserApi {
  login: (loginBody: LoginBody) => Promise<UserWithToken>;
  register: (registerBody: RegisterBody) => Promise<RegisterResponse>;
  activate: (token: string) => Promise<UserWithToken>;
}
