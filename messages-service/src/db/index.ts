import { MikroORM } from "@mikro-orm/core";
import { Message } from "./entities/message";
import { Room } from "./entities/room";

const createOrm = () => {
  return MikroORM.init({
    entities: [Message, Room],
    type: "mongo",
    dbName: process.env.MONGO_DB,
    clientUrl: process.env.CONNECTION_STRING,
    debug: true,
  });
};

export { createOrm };
