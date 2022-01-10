import { AxiosInstance } from "axios";
import axios from "axios";
import { getTokenFromLS } from "../store/auth/index";

export enum ChatEvents {
  MESSAGE_RECEIVED = "message_received",
  MESSAGE_SEND = "message_send",
}

export interface MessageReceived {
  id: string;
  userId: string;
  roomId: string;
  content: string;
  createdAt: Date;
  image?: string
}

export interface MessageSend {
  userId: string;
  content: string;
}

interface GetMesssagesArgs {
  receiverId: string;
  page: number;
}

class ChatApi {
  readonly #client: AxiosInstance;
  constructor(_client: AxiosInstance) {
    this.#client = _client;
  }

  async getMessages({
    receiverId,
    page,
  }: GetMesssagesArgs): Promise<MessageReceived[]> {
    const { data } = await this.#client.get(`/${receiverId}/${page}`, {
      headers: { Authorization: getTokenFromLS() ?? "" },
    });

    return (data.messages as MessageReceived[]).reverse();
  }
}

const chatApi = new ChatApi(
  axios.create({
    baseURL: "/messages",
    headers: { "Content-Type": "application/json" },
  })
);

export { chatApi };
