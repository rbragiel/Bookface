import { getTokenFromLS } from "@store/auth";
import { Socket, io } from "socket.io-client";

export enum BasicEvents {
  CONNECT = "connect",
  CONNECT_ERROR = "connect_error",
}

const chatURL = "http://localhost:4000/";

interface ChatApiParams {
  receiverId: string;
}

const connectAsync = ({ receiverId }: ChatApiParams) => {
  return new Promise<Socket>((res, rej) => {
    const _socket = io(chatURL, {
      auth: { token: getTokenFromLS(), receiverId },
      path: "/chat",
    });

    _socket.on(BasicEvents.CONNECT, () => {
      res(_socket as Socket);
    });

    _socket.on(BasicEvents.CONNECT_ERROR, (error) => {
      rej(error);
    });
  });
};

export { connectAsync };
