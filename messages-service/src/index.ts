import express from "express";
import http from "http";
import { RequestContext } from "@mikro-orm/core";
import { Server } from "socket.io";
import { errorHandler, notFound } from "./middleware/error";
import { logger } from "./common/logger";
import { handleSocket } from "./chat";
import { createOrm } from "./db";

(async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const orm = await createOrm();

  const PORT = process.env.MESSAGES_PORT || 4000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  app.use(notFound);
  app.use(errorHandler);

  handleSocket(io);

  server.listen(PORT, () => {
    logger.info("App running on port: %d", PORT);
  });
})();
