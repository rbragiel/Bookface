import { errorHandler, notFound } from "./middleware/error";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { logger } from "./common/logger";
import { handleSocket } from "./chat";

(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  const PORT = process.env.MESSAGES_PORT || 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(notFound);
  app.use(errorHandler);

  handleSocket(io);

  server.listen(PORT, () => {
    logger.info("App running on port: %d", PORT);
  });
})();
