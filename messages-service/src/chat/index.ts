/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { IncomingMessage } from "http";
import { Server, Socket } from "socket.io";
import { Constants } from "../common/constants";
import { logger } from "../common/logger";
import { getRoomByUserIds, Room } from "../db/entities/room";
import { Message as MessageRepository } from "../db/entities/message";
import { DI } from "../index";

interface IncomingMessageWithUser extends IncomingMessage {
  user: User;
  receiverId: string;
}

interface SocketWithUser extends Socket {
  request: IncomingMessageWithUser;
}

interface Message {
  userId: string;
  content: string;
}

enum SocketEvents {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  MESSAGE_RECEIVED = "message_received",
  MESSAGE_SEND = "message_send",
}

const handleSocket = (io: Server) => {
  io.use(async (_socket, next) => {
    const socket = <SocketWithUser>_socket;

    const token = socket.handshake.auth.token as string | null;
    const receiverId = socket.handshake.auth.receiverId as string | null;

    if (!token || !token.startsWith("Bearer") || !receiverId) {
      return next(new Error("User unauthorized"));
    }

    try {
      const { data } = await axios.get(Constants.AUTH_SERVICE_URL, {
        headers: { Authorization: token },
      });

      socket.request.user = data;
      socket.request.receiverId = receiverId;

      return next();
    } catch (error) {
      return next(new Error("User unauthorized"));
    }
  });

  io.on(SocketEvents.CONNECTION, async (_socket) => {
    const socket = <SocketWithUser>_socket;
    const savedUser = socket.request.user;
    const receiverId = socket.request.receiverId;

    let room = (await getRoomByUserIds(
      DI.em,
      savedUser.userId,
      receiverId
    )) as Room;

    if (!room) {
      room = new Room(savedUser.userId, receiverId);
      await DI.em.persistAndFlush(room);
    }

    await socket.join(room.id);

    console.log(socket.rooms);

    socket.on(
      SocketEvents.MESSAGE_SEND,
      async ({ content, userId }: Message) => {
        logger.info({ content, userId, roomId: room.id });

        const message = new MessageRepository({
          content,
          userId,
          roomId: room.id,
        });
        await DI.em.persistAndFlush(message);

        io.to(room!.id).emit(SocketEvents.MESSAGE_RECEIVED, message);
        logger.info(`${SocketEvents.MESSAGE_SEND} Event emmited`);
      }
    );

    socket.on(SocketEvents.DISCONNECT, () => {
      socket.leave(room!.id);
      logger.info("Disconnected");
    });
  });
};

export { handleSocket };
