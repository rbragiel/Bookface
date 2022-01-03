import { MikroORM } from "@mikro-orm/core";
import { Message } from "./entities/message";

const createOrm = () => {
  return MikroORM.init({
    entities: [Message],
    type: "mongo",
    dbName: process.env.MONGO_DB,
    clientUrl: process.env.CONNECTION_STRING,
    debug: true,
  });
};

export { createOrm };
