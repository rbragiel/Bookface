import axios from "axios";
import type { AxiosInstance } from "axios";
import { User, UserWithToken } from "@models/user";
import { IUserApi, LoginBody, RegisterBody, RegisterResponse } from "./types";

class UserApiEndpoints {
  static registerUrl = "/register";
  static loginUrl = "/login";
  static activateUrl = "/activate";
  static meUrl = "/me";
}

class UserApi implements IUserApi {
  readonly #client: AxiosInstance;
  constructor(_client: AxiosInstance) {
    this.#client = _client;
  }

  async register(body: RegisterBody): Promise<RegisterResponse> {
    const { data } = await this.#client.post(
      UserApiEndpoints.registerUrl,
      body
    );

    return data;
  }

  async login(body: LoginBody): Promise<UserWithToken> {
    const { data } = await this.#client.post(UserApiEndpoints.loginUrl, body);

    return data;
  }

  async activate(token: string): Promise<UserWithToken> {
    const { data } = await this.#client.post(
      UserApiEndpoints.activateUrl.concat(`/${token}`)
    );

    return data;
  }

  async me(token: string): Promise<UserWithToken> {
    const { data } = await this.#client.get(UserApiEndpoints.meUrl, {
      headers: { Authorization: token },
    });

    return Object.assign(data as unknown as User, { token });
  }

  async update(body: FormData, token?: string): Promise<User> {
    const { data } = await this.#client.patch("/", body, {
      headers: { Authorization: token ?? "" },
    });

    return data.user as User;
  }
}

const userApi = new UserApi(
  axios.create({
    baseURL: "/api/user",
    headers: { "Content-Type": "application/json" },
  })
);

export default userApi;
