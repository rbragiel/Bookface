import express from "express";
import http from "http";
import { RequestContext, MikroORM } from "@mikro-orm/core";
import { Server } from "socket.io";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/error";
import { logger } from "./common/logger";
import { handleSocket } from "./chat";
import { createOrm } from "./db";
import { ChatController } from "./controllers/chat";
import { Room } from "./db/entities/room";
import { Message } from "./db/entities/message";
import { EntityManager, EntityRepository } from "@mikro-orm/mongodb";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  roomRepository: EntityRepository<Room>;
  messageRepository: EntityRepository<Message>;
};

(async () => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
    path: "/chat",
  });

  DI.orm = await createOrm();
  DI.em = DI.orm.em as EntityManager;
  DI.roomRepository = DI.orm.em.getRepository(Room);
  DI.messageRepository = DI.orm.em.getRepository(Message);

  const PORT = process.env.MESSAGES_PORT || 4000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  app.use("/messages", ChatController);

  app.use(notFound);
  app.use(errorHandler);

  handleSocket(io);

  server.listen(PORT, () => {
    logger.info("App running on port: %d", PORT);
  });
})();
